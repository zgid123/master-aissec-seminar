import {mean,nullableMedian,quantile,rng} from './math.ts';
import {replay} from './policy.ts';
import type {Scenario,Policy,ReplayResult,Row,Config} from './types.ts';

export function meetsPolicyConstraints(m:Row,c:Config['constraints']):boolean {
  return m.detection_rate!==null&&Number(m.detection_rate)>=c.minDetectionRate&&m.median_ttd_keys_detected_only!==null&&Number(m.median_ttd_keys_detected_only)<=c.maxMedianTtdKeys&&m.far_session_at_L!==null&&Number(m.far_session_at_L)<=c.maxPolicyFar&&m.unknown_at_L===0&&m.wrongful_revokes===0&&m.pre_takeover_revokes===0;
}

export function windowRates(rows:{z:number;label:string}[],threshold:number):{far:number|null;frr:number|null;genuine:number;impostor:number} {
  const g=rows.filter(r=>r.label==='genuine'),i=rows.filter(r=>r.label==='impostor');
  return {far:i.length?i.filter(r=>r.z<threshold).length/i.length:null,frr:g.length?g.filter(r=>r.z>=threshold).length/g.length:null,genuine:g.length,impostor:i.length};
}
export function rocEer(rows:{z:number;label:string}[]):{eer:number|null;curve:Row[]} {
  const usable=rows.filter(r=>r.label==='genuine'||r.label==='impostor');
  if(!usable.some(r=>r.label==='genuine')||!usable.some(r=>r.label==='impostor'))return {eer:null,curve:[]};
  const scores=[...new Set(usable.map(r=>r.z))].sort((a,b)=>b-a);
  // Higher score = impostor. ROC FPR=FRR; FNR=FAR.
  const curve:Row[]=[{threshold:null,endpoint:'accept_all',far:1,frr:0,tpr:0}];
  for(const threshold of scores){const m=windowRates(usable,threshold);curve.push({threshold,endpoint:'empirical',far:m.far,frr:m.frr,tpr:1-m.far!});}
  curve.push({threshold:null,endpoint:'reject_all',far:0,frr:1,tpr:1});
  let eer:number|null=null;
  for(let j=1;j<curve.length;j++){
    const a=curve[j-1],b=curve[j],da=Number(a.far)-Number(a.frr),db=Number(b.far)-Number(b.frr);
    if(da>=0&&db<=0){const t=da===db?0:da/(da-db);eer=Number(a.far)+t*(Number(b.far)-Number(a.far));break;}
  }
  return {eer,curve};
}
export function summarizeReplay(results:ReplayResult[],horizonKeys=150):Row {
  const g=results.filter(r=>r.kind==='G0'),a=results.filter(r=>r.kind==='A1');
  const eligible=a.filter(r=>!r.preTakeoverRevoke),detected=eligible.filter(r=>r.detection);
  const known=eligible.filter(r=>(r.ttdKeys!==null&&r.ttdKeys<=horizonKeys)||r.horizonKeys>=horizonKeys);
  const detectedAtL=known.filter(r=>r.ttdKeys!==null&&r.ttdKeys<=horizonKeys).length;
  const exposure=g.reduce((s,r)=>s+r.observedRecordingSeconds,0),wall=g.reduce((s,r)=>s+r.observedWallSeconds,0),requests=g.reduce((s,r)=>s+r.mfaRequests,0);
  return {genuine_sessions:g.length,attack_scenarios:a.length,eligible_attacks:eligible.length,pre_takeover_revokes:a.length-eligible.length,detected:detected.length,censored:eligible.filter(r=>r.censored).length,
    delayed_genuine_alert_detections:detected.filter(r=>r.detectionEvidence==='delayed_genuine_window').length,
    detection_rate:eligible.length?detected.length/eligible.length:null,
    policy_horizon_keys:horizonKeys,known_at_L:known.length,unknown_at_L:eligible.length-known.length,
    detection_rate_at_L:known.length?detectedAtL/known.length:null,
    far_session_at_L:known.length?1-detectedAtL/known.length:null,
    median_ttd_keys_detected_only:nullableMedian(detected.map(r=>r.ttdKeys!)),median_ttd_ms_detected_only:nullableMedian(detected.map(r=>r.ttdMs!)),
    q1_ttd_keys_detected_only:detected.length?quantile(detected.map(r=>r.ttdKeys!),.25):null,q3_ttd_keys_detected_only:detected.length?quantile(detected.map(r=>r.ttdKeys!),.75):null,
    mfa_requests:requests,recording_seconds:exposure,wall_seconds:wall,
    mfa_per_recording_hour:exposure>0?requests*3600/exposure:null,mfa_per_wall_hour:wall>0?requests*3600/wall:null,
    wrongful_revokes:g.reduce((s,r)=>s+r.wrongfulRevokes,0)};
}
export function replayAll(scenarios:Scenario[],policy:Policy,horizonKeys=150):{results:ReplayResult[];summary:Row} {
  const results=scenarios.map(s=>replay(s,policy));return {results,summary:summarizeReplay(results,horizonKeys)};
}
export function macro(rows:Row[],keys:string[]):Row {
  return Object.fromEntries(keys.map(k=>[k,mean(rows.map(r=>r[k]).filter((x):x is number=>typeof x==='number'))]));
}
export function pairedBootstrap(differences:number[],seed:number,repetitions=2000):Row {
  if(differences.length<2)return {n:differences.length,mean_difference:mean(differences),ci_low:null,ci_high:null,reason:'fewer_than_two_pairs'};
  const random=rng(seed),samples=Array.from({length:repetitions},()=>mean(differences.map(()=>differences[Math.floor(random()*differences.length)]))!);
  return {n:differences.length,mean_difference:mean(differences),median_difference:nullableMedian(differences),ci_low:quantile(samples,.025),ci_high:quantile(samples,.975),repetitions,seed};
}
/** Exact conditional sign enumeration, retaining average ranks for ties. */
export function wilcoxon(differences:number[]):Row {
  const xs=differences.filter(x=>x!==0).map(x=>({x,abs:Math.abs(x),rank:0})).sort((a,b)=>a.abs-b.abs);
  if(!xs.length)return {nonzero_pairs:0,p_two_sided:1,rank_biserial:null,reason:'all_differences_zero'};
  if(xs.length>20)return {nonzero_pairs:xs.length,p_two_sided:null,rank_biserial:null,reason:'exact_enumeration_limited_to_20_pairs'};
  for(let i=0;i<xs.length;){let j=i+1;while(j<xs.length&&xs[j].abs===xs[i].abs)j++;for(let k=i;k<j;k++)xs[k].rank=(i+1+j)/2;i=j;}
  const total=xs.reduce((s,x)=>s+x.rank,0),wplus=xs.filter(x=>x.x>0).reduce((s,x)=>s+x.rank,0),observed=Math.abs(wplus-total/2);
  let extreme=0;
  for(let mask=0;mask<2**xs.length;mask++){let wp=0;for(let j=0;j<xs.length;j++)if(mask&(1<<j))wp+=xs[j].rank;if(Math.abs(wp-total/2)>=observed-1e-12)extreme++;}
  return {nonzero_pairs:xs.length,w_plus:wplus,w_minus:total-wplus,p_two_sided:extreme/2**xs.length,rank_biserial:(2*wplus-total)/total};
}
