import {median,mad,seedFor} from './math.ts';
import {FEATURES,normalize,partitionValidation,profileKey} from './data.ts';
import type {Dataset} from './data.ts';
import {fitScorer,score} from './scorers.ts';
import {makeScenarios,scored} from './scenarios.ts';
import {replayAll,windowRates,meetsPolicyConstraints} from './metrics.ts';
import type {Config,Bundle,Profile,Policy,Row,Scenario,Selection} from './types.ts';

export function validateConfig(c:Config):void {
  if(![20,50,100].includes(c.windowSize)||!Number.isSafeInteger(c.seed)||!c.scorers.length||new Set(c.scorers).size!==c.scorers.length||c.scorers.some(s=>!['distance','isolation_forest'].includes(s)))throw new Error('Invalid windowSize/seed/scorers');
  for(const a of [c.thresholds,c.windowThresholds,c.ks,c.lambdas])if(!a.length||a.some(x=>!Number.isFinite(x)))throw new Error('Empty/nonfinite grid');
  if(c.thresholds.some(x=>x<=0)||c.ks.some(x=>x<0)||c.lambdas.some(x=>x<=0||x>1)||!(c.h2Ratio>1)||!Number.isSafeInteger(c.cooldownWindows)||c.cooldownWindows<0)throw new Error('Invalid policy grid');
  if(!Number.isSafeInteger(c.attack.prefixKeys)||!Number.isSafeInteger(c.attack.suffixKeys)||c.attack.prefixKeys<c.windowSize||c.attack.suffixKeys<c.windowSize||!(c.attack.joinDownDownMs>0))throw new Error('Invalid attack design');
  if(!(c.constraints.maxMedianTtdKeys>0)||c.constraints.minDetectionRate<=0||c.constraints.minDetectionRate>1||c.constraints.maxWindowFar<0||c.constraints.maxWindowFar>1)throw new Error('Invalid constraints');
  if(!Number.isSafeInteger(c.constraints.policyHorizonKeys)||c.constraints.policyHorizonKeys<1||c.constraints.policyHorizonKeys>c.attack.suffixKeys||c.constraints.maxPolicyFar<0||c.constraints.maxPolicyFar>1)throw new Error('Invalid policy FAR horizon/constraint');
}
function metricsFor(scenarios:Record<string,Scenario[]>,policies:Record<string,Policy>,c:Config):{metrics:Row;feasible:boolean;violation:number;validationByUser:Selection['validationByUser']} {
  const validationByUser=Object.fromEntries(Object.entries(scenarios).map(([u,s])=>{
    const metrics=replayAll(s,policies[u],c.constraints.policyHorizonKeys).summary;
    return [u,{metrics,feasible:meetsPolicyConstraints(metrics,c.constraints)}];
  }));
  const summaries=Object.values(validationByUser).map(v=>v.metrics);
  const feasible=Object.values(validationByUser).every(v=>v.feasible);
  const violation=summaries.reduce((s,m)=>s+Math.max(0,c.constraints.minDetectionRate-Number(m.detection_rate??0))+Math.max(0,Number(m.median_ttd_keys_detected_only??c.constraints.maxMedianTtdKeys*10)/c.constraints.maxMedianTtdKeys-1)+Math.max(0,Number(m.far_session_at_L??1)-c.constraints.maxPolicyFar)+Number(m.unknown_at_L)+Number(m.wrongful_revokes)+Number(m.pre_takeover_revokes),0);
  return {metrics:{macro_mfa_per_recording_hour:summaries.reduce((s,m)=>s+Number(m.mfa_per_recording_hour),0)/summaries.length,min_detection_rate:Math.min(...summaries.map(m=>Number(m.detection_rate??0))),max_far_session_at_L:Math.max(...summaries.map(m=>Number(m.far_session_at_L??1))),max_median_ttd_keys:Math.max(...summaries.map(m=>Number(m.median_ttd_keys_detected_only??c.constraints.maxMedianTtdKeys*10))),wrongful_revokes:summaries.reduce((s,m)=>s+Number(m.wrongful_revokes),0),pre_takeover_revokes:summaries.reduce((s,m)=>s+Number(m.pre_takeover_revokes),0)},feasible,violation,validationByUser};
}
export function choosePolicy(scenarios:Record<string,Scenario[]>,candidates:Policy[],c:Config):{selection:Selection;search:Row[]} {
  const users=Object.keys(scenarios).sort();
  const trials=candidates.map((p,index)=>{const m=metricsFor(scenarios,Object.fromEntries(users.map(u=>[u,p])),c);return {p,index,...m};});
  trials.sort((a,b)=>Number(b.feasible)-Number(a.feasible)||a.violation-b.violation||Number(a.metrics.macro_mfa_per_recording_hour)-Number(b.metrics.macro_mfa_per_recording_hour)||Number(a.metrics.max_median_ttd_keys)-Number(b.metrics.max_median_ttd_keys)||a.index-b.index);
  const best=trials[0];
  return {selection:{policy:best.p,feasible:best.feasible,metrics:best.metrics,validationByUser:best.validationByUser},search:trials.map(t=>({...t.p,feasible:t.feasible,violation:t.violation,...t.metrics,selected:t===best}))};
}
export function fit(data:Dataset,c:Config,sourceHashes:Record<string,string>):{bundle:Bundle;search:Row[]} {
  validateConfig(c);
  const partition=partitionValidation(data.windows,c.windowSize),users=Object.keys(partition).sort();
  const bundle:Bundle={version:'1.1',config:c,featureColumns:FEATURES,dataKind:data.dataKind,inputHashes:data.hashes,sourceHashes,profiles:{},selections:{},windowThresholds:{},validationPartition:partition};
  const search:Row[]=[];
  for(const name of c.scorers){
    const scenarios:Record<string,Scenario[]>={},windowRecords:{z:number;label:string}[]=[];
    for(const target of users){
      const n=data.normalizers.profiles[`${target}:${c.windowSize}`];if(!n)throw new Error('Missing target normalizer');
      const train=data.windows.filter(w=>w.participant_id===target&&w.window_size===c.windowSize&&w.split==='train');
      const model=fitScorer(name,train.map(w=>normalize(w,n)),c.forest,seedFor(c.seed,profileKey(name,target)));
      const cal=data.windows.filter(w=>w.participant_id===target&&w.window_size===c.windowSize&&partition[target].calibration.includes(w.session_id));
      const points=cal.map(w=>score(model,normalize(w,n))),scale=1.4826*mad(points);
      if(!(scale>0))throw new Error(`Score MAD=0 for ${name}/${target}; collect more calibration data or revise scorer. No epsilon fallback.`);
      const p:Profile={target,windowSize:c.windowSize,scorer:model,normalizer:n,calibration:{median:median(points),scale,sessions:partition[target].calibration,windows:cal.length},trainingSessions:[...new Set(train.map(w=>w.session_id))].sort(),tuningSessions:partition[target].tuning};
      bundle.profiles[profileKey(name,target)]=p;
      scenarios[target]=makeScenarios(data,p,'validation',c,partition);
      for(const w of data.windows.filter(w=>w.window_size===c.windowSize&&w.split==='validation'&&partition[w.participant_id].tuning.includes(w.session_id)))windowRecords.push(scored(w,p,w.participant_id===target?'genuine':'impostor'));
    }
    const thresholds=c.windowThresholds.map((threshold,index)=>{
      const m=windowRates(windowRecords,threshold);return {threshold,far:m.far!,frr:m.frr!,feasible:m.far!==null&&m.far<=c.constraints.maxWindowFar,index};
    }).sort((a,b)=>Number(b.feasible)-Number(a.feasible)||(a.feasible?a.frr-b.frr:a.far-b.far)||a.index-b.index);
    const t=thresholds[0];bundle.windowThresholds[name]={threshold:t.threshold,far:t.far,frr:t.frr,feasible:t.feasible};
    const policy=(n:Policy['name'],lambda:number,k:number,h1:number):Policy=>({name:n,lambda,k,h1,h2:h1*c.h2Ratio,cooldownWindows:c.cooldownWindows});
    const b0=choosePolicy(scenarios,c.thresholds.map(h=>policy('B0',1,0,h)),c);
    const b1=choosePolicy(scenarios,c.lambdas.flatMap(l=>c.ks.flatMap(k=>c.thresholds.map(h=>policy('B1',l,k,h)))),c);
    const lambda1=choosePolicy(scenarios,c.ks.flatMap(k=>c.thresholds.map(h=>policy('B1',1,k,h))),c);
    search.push(...b0.search.map(r=>({scorer:name,target:'ALL',policy_id:'B0',...r})),...b1.search.map(r=>({scorer:name,target:'ALL',policy_id:'B1',...r})),...lambda1.search.map(r=>({scorer:name,target:'ALL',policy_id:'B1_lambda1',...r})));
    for(const target of users){
      const p1=choosePolicy({[target]:scenarios[target]},c.thresholds.map(h=>policy('P1',b1.selection.policy.lambda,b1.selection.policy.k,h)),c);
      bundle.selections[profileKey(name,target)]={B0:b0.selection,B1:b1.selection,P1:p1.selection,B1_lambda1:lambda1.selection};
      search.push(...p1.search.map(r=>({scorer:name,target,policy_id:'P1',...r})));
    }
  }
  return {bundle,search};
}
