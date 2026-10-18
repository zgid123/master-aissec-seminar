import test from 'node:test';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {quantile,median,mad,cPath,rng} from '../src/math.ts';
import {fitScorer,score} from '../src/scorers.ts';
import {FEATURES,normalize,loadData,partitionValidation} from '../src/data.ts';
import {step,replay} from '../src/policy.ts';
import {featureWindow,makeScenarios,verifyFeatureParity} from '../src/scenarios.ts';
import {windowRates,rocEer,wilcoxon,pairedBootstrap,summarizeReplay} from '../src/metrics.ts';
import {fit,validateConfig,choosePolicy} from '../src/fit.ts';
import {evaluate} from '../src/evaluate.ts';
import {RiskEngine} from '../src/runtime.ts';
import {readJson,csvParse} from '../src/io.ts';
import type {Config,Policy,Scenario,Stroke,WindowRow,Profile,Normalizer} from '../src/types.ts';

const close=(a:number,b:number,tol=1e-10)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);
const root=fileURLToPath(new URL('../',import.meta.url)),dataRoot=resolve(root,'../member2/artifacts/processed');
const config=await readJson<Config>(resolve(root,'config.json'));
const data=await loadData(dataRoot,resolve(dataRoot,'..'),resolve(dataRoot,'../manifest.json'));
const policy:Policy={name:'B1',lambda:.9,k:.5,h1:6,h2:12,cooldownWindows:2};
function scenario(zs:number[],takeover:number|null=0):Scenario {
  return {id:'fixture',target:'A',split:'test',kind:takeover===null?'G0':'A1',sourceSessions:['fixture'],sourceSegments:['fixture:0'],windows:zs.map((z,i)=>({windowId:`G0:W${i}`,startMs:i*100,endMs:(i+1)*100,a:z,z,label:takeover===null?'genuine':'impostor',observedImpostorKeys:(i+1)*50})),t0:takeover,horizonKeys:zs.length*50,availableHorizonMs:zs.length*100-(takeover??0),recordingSeconds:zs.length/10,wallSeconds:zs.length/10,recordingIntervals:[[0,zs.length*100]],wallStartMs:0,prefixKeys:0,suffixKeys:zs.length*50,joinDownDownMs:null};
}
test('median/IQR/MAD agree with hand calculations',()=>{assert.equal(median([1,2,3,4]),2.5);assert.equal(quantile([1,2,3,4],.25),1.75);assert.equal(mad([1,2,3,4]),1);assert.throws(()=>median([]));assert.throws(()=>median([NaN]));});
test('harmonic path correction exact small values',()=>{close(cPath(1),0);close(cPath(2),1);close(cPath(3),5/3);});
test('PRNG reproducible and seed-sensitive',()=>{const a=rng(3),b=rng(3),c=rng(4);const x=Array.from({length:10},a);assert.deepEqual(x,Array.from({length:10},b));assert.notDeepEqual(x,Array.from({length:10},c));assert.ok(x.every(v=>v>=0&&v<1));});
test('robust L1 distance uses training center',()=>{const m=fitScorer('distance',[[0,1],[2,3],[1,2]]);close(score(m,[1,2]),0);close(score(m,[5,4]),3);assert.throws(()=>score(m,[1]));});
test('IF reproducible, finite and ranks isolated point above central point',()=>{
  const x=Array.from({length:100},(_,i)=>[Math.sin(i),Math.cos(i)]),m=fitScorer('isolation_forest',x,{trees:200,sampleSize:64},42);
  assert.deepEqual(m,fitScorer('isolation_forest',x,{trees:200,sampleSize:64},42));assert.ok(score(m,[20,20])>score(m,[0,0]));assert.ok(score(m,[0,0])>0&&score(m,[0,0])<=1);
});
test('IF handles identical rows without empty child recursion',()=>{const m=fitScorer('isolation_forest',[[1],[1],[1]],{trees:10,sampleSize:3},1);close(score(m,[1]),.5);});
test('invalid forest and matrix rejected',()=>{assert.throws(()=>fitScorer('distance',[[]]));assert.throws(()=>fitScorer('isolation_forest',[[1],[2]],{trees:0,sampleSize:2}));assert.throws(()=>fitScorer('distance',[[1],[Infinity]]));});
test('normalization uses claimed target and drops inactive dimensions',()=>{
  const w=data.windows.find(w=>w.window_size===50&&w.participant_id==='SIM02')!,n=data.normalizers.profiles['SIM01:50'],copy=structuredClone(w),x=normalize(w,n);
  assert.equal(x.length,n.active.filter(Boolean).length);const j=n.active.indexOf(true);close(x[0],(Number(w[FEATURES[j]])-n.median[j])/n.scale[j]);assert.deepEqual(w,copy);
});
test('inactive dimension ignores even very different finite candidate values',()=>{
  const n:Normalizer={median:FEATURES.map(()=>0),scale:FEATURES.map(()=>1),active:FEATURES.map((_,i)=>i!==0),training_sessions:[],training_windows:2};
  const w={...data.windows[0],[FEATURES[0]]:1e10};assert.equal(normalize(w,n).length,11);
});
test('validation separated by entire session',()=>{const p=partitionValidation(data.windows,50);for(const [u,v]of Object.entries(p)){assert.equal(v.calibration.length,1);assert.equal(v.tuning.length,1);assert.notEqual(v.calibration[0],v.tuning[0]);assert.ok(v.calibration[0].startsWith(u));}});
test('insufficient validation sessions rejected instead of random window split',()=>{assert.throws(()=>partitionValidation(data.windows.filter(w=>!w.session_id.endsWith('D2_S2')),50),/independent validation/);});
test('CUSUM numerical example 2.5,4.75,6.775',()=>{let state={s:0,cooldown:0};const values=[];for(const z of [3,3,3]){const r=step(z,state,policy);values.push(r.s);state=r;}assert.deepEqual(values,[2.5,4.75,6.775]);});
test('CUSUM floors at zero and lambda=1 is ordinary recurrence',()=>{assert.equal(step(-5,{s:1,cooldown:0},policy).s,0);close(step(3,{s:2.5,cooldown:0},{...policy,lambda:1}).s,5);});
test('B0 uses current standardized score only',()=>{assert.equal(step(1,{s:100,cooldown:0},{...policy,name:'B0'}).s,1);});
test('threshold equality triggers challenge or revoke',()=>{const p={...policy,name:'B0' as const};assert.equal(step(6,{s:0,cooldown:0},p).action,'MFA_CHALLENGE');assert.equal(step(12,{s:0,cooldown:0},p).action,'REVOKE');});
test('cooldown suppresses h1 but never h2',()=>{assert.equal(step(8,{s:0,cooldown:1},policy).action,'CONTINUE');assert.equal(step(20,{s:0,cooldown:2},policy).action,'REVOKE');});
test('invalid parameters/nonfinite risk rejected',()=>{assert.throws(()=>step(NaN,{s:0,cooldown:0},policy));assert.throws(()=>step(1,{s:0,cooldown:0},{...policy,h2:1}));});
test('genuine MFA resets risk and observes two-window cooldown',()=>{const r=replay(scenario([7,7,7,7],null),{...policy,name:'B0'});assert.equal(r.mfaRequests,2);assert.equal(r.wrongfulRevokes,0);assert.deepEqual(r.events.filter(e=>e.event==='MFA_PASS').length,2);});
test('attacker MFA fails, no log invented after revoke',()=>{const r=replay(scenario([7,7,7]),{...policy,name:'B0'});assert.equal(r.detection,true);assert.equal(r.ttdKeys,50);assert.equal(r.ttdMs,100);assert.equal(r.logs.length,1);assert.ok(r.events.some(e=>e.event==='MFA_FAIL'));});
test('no detection is censored, TTD is null rather than zero/horizon',()=>{const r=replay(scenario([0,0]),policy);assert.equal(r.censored,true);assert.equal(r.ttdKeys,null);assert.equal(r.ttdMs,null);});
test('revoke before takeover is not detection or right censoring',()=>{const r=replay(scenario([20,20],150),policy);assert.equal(r.preTakeoverRevoke,true);assert.equal(r.detection,false);assert.equal(r.censored,false);assert.equal(r.ttdKeys,null);});
test('genuine revoke exposure uses actual recording intervals',()=>{const s=scenario([20,20],null);s.recordingIntervals=[[0,50],[75,200]];const r=replay(s,policy);close(r.observedRecordingSeconds,.075);close(r.observedWallSeconds,.1);});
test('segment boundary resets CUSUM, never at hidden takeover',()=>{const s=scenario([3,3,3]);s.kind='G0';s.t0=null;s.windows[2].windowId='G1:W2';const r=replay(s,policy);assert.equal(r.logs[2].s,2.5);assert.equal(r.events.filter(e=>e.event==='SEGMENT_RESET').length,1);});
test('hand-calculated features preserve negative flight',()=>{
  const s=[{...data.strokes[0],down_ms:10,up_ms:50,group:'typing'},{...data.strokes[0],down_ms:20,up_ms:80,group:'correction'}] as Stroke[];
  const w=featureWindow(s,'fixture',2);assert.equal(w.dwell_median_ms,50);assert.equal(w.dwell_iqr_ms,10);assert.equal(w.flight_median_ms,-30);assert.equal(w.down_down_median_ms,10);assert.equal(w.correction_proportion,.5);close(Number(w.strokes_per_minute),120000/70);
});
test('all member2 feature windows reconstructed within CSV rounding tolerance',()=>{const r=verifyFeatureParity(data);assert.equal(r.windowsChecked,2304);});
test('window rates use score>=threshold; empty class returns null',()=>{const r=windowRates([{z:2,label:'genuine'},{z:1,label:'impostor'},{z:9,label:'mixed'}],2);assert.equal(r.far,1);assert.equal(r.frr,1);assert.equal(windowRates([],2).far,null);});
test('EER perfect separation, ties and reversed ordering',()=>{close(rocEer([{z:0,label:'genuine'},{z:1,label:'impostor'}]).eer!,0);close(rocEer([{z:1,label:'genuine'},{z:1,label:'impostor'}]).eer!,.5);close(rocEer([{z:1,label:'genuine'},{z:0,label:'impostor'}]).eer!,1);});
test('Wilcoxon exact minimum p for four pairs is .125',()=>{const w=wilcoxon([1,2,3,4]);assert.equal(w.p_two_sided,.125);assert.equal(w.rank_biserial,1);assert.equal(wilcoxon([0,0]).rank_biserial,null);assert.equal(wilcoxon([-1,1]).p_two_sided,1);});
test('paired bootstrap deterministic and uses mean-difference CI',()=>{assert.deepEqual(pairedBootstrap([1,2,3,4],42),pairedBootstrap([1,2,3,4],42));assert.equal(pairedBootstrap([1],42).ci_low,null);});
test('CSV quoted values, escaped quotes and CRLF',()=>{assert.deepEqual(csvParse('id,note\r\n001,"a,b"\r\n002,"a""b"\r\n'),[{id:'001',note:'a,b'},{id:'002',note:'a"b'}]);assert.throws(()=>csvParse('a\n"bad'));});
test('config rejects invalid design',()=>{assert.throws(()=>validateConfig({...config,lambdas:[2]}));assert.throws(()=>validateConfig({...config,windowSize:1}));});

// Small deterministic integration run includes actual member2 artifacts.
const tiny={...config,forest:{trees:20,sampleSize:32},thresholds:[1,3],lambdas:[.9,1],ks:[.5]};
const {bundle}=fit(data,tiny,{});
test('test feature changes cannot alter fitted models or selected thresholds',()=>{
  const changed=structuredClone(data);for(const w of changed.windows)if(w.split==='test')for(const f of FEATURES)w[f]=999999;
  const result=fit(changed,tiny,{}).bundle;assert.deepEqual(result,bundle);
});
test('model does not use source ID, labels, time or split as features',()=>{const p=bundle.profiles['distance/SIM01'],w=data.windows[0],m={...w,participant_id:'UNKNOWN',split:'test',session_id:'different',start_ms:1e10} as WindowRow;assert.deepEqual(normalize(w,p.normalizer),normalize(m,p.normalizer));});
test('calibration, tune and train session provenance disjoint',()=>{for(const p of Object.values(bundle.profiles)){assert.ok(p.calibration.sessions.every(id=>!p.trainingSessions.includes(id)&&!p.tuningSessions.includes(id)));}});
test('P1 preserves B1 lambda/k; B1_lambda1 independently tuned',()=>{for(const s of Object.values(bundle.selections)){assert.equal(s.P1.policy.lambda,s.B1.policy.lambda);assert.equal(s.P1.policy.k,s.B1.policy.k);assert.equal(s.B1_lambda1.policy.lambda,1);}});
test('A1 assembled from strokes, includes mixed window and no oracle reset',()=>{
  const p=bundle.profiles['distance/SIM01'],s=makeScenarios(data,p,'test',tiny,bundle.validationPartition).find(s=>s.kind==='A1')!;
  assert.ok(s.sourceSessions.every(id=>id.includes('_D3_')));assert.equal(s.windows.filter(w=>w.label==='mixed').length,1);assert.equal(s.prefixKeys,225);assert.equal(s.suffixKeys,300);
  assert.ok(s.windows.every((w,i)=>i===0||w.endMs>=s.windows[i-1].endMs));
});
test('evaluation preserves frozen model and marks diagnostic results',()=>{const copy=structuredClone(bundle),r=evaluate(data,bundle);assert.deepEqual(bundle,copy);assert.equal(r.tables.window_metrics.length,8);assert.equal(r.tables.policy_metrics.length,32);assert.match(r.report,/mô phỏng/);assert.ok(r.tables.decisions.every(x=>!Object.hasOwn(x,'true_participant_feature')));});
test('evaluation refuses changed dataset hashes',()=>{assert.throws(()=>evaluate({...data,hashes:{tampered:'yes'}},bundle),/changed after fit/);});
test('runtime returns real risk result with no label and handles pending MFA',()=>{
  const p:Profile=structuredClone(bundle.profiles['distance/SIM01']);p.calibration={...p.calibration,median:-1,scale:1};
  const engine=new RiskEngine(p,{...policy,name:'B0',h1:.5,h2:1e9});const w=data.windows.find(w=>w.window_size===50)!;
  const r=engine.observe(w);assert.equal(r.action,'MFA_CHALLENGE');assert.equal(engine.status,'MFA_PENDING');assert.throws(()=>engine.observe(w),/MFA_PENDING/);
  engine.resolveMfa(true);assert.equal(engine.status,'ACTIVE');assert.equal(engine.state.s,0);assert.equal(engine.state.cooldown,2);assert.throws(()=>engine.resolveMfa(true),/No pending/);
});
test('summary retains censored count and conditional median',()=>{const r=summarizeReplay([replay(scenario([7]),{...policy,name:'B0'}),replay(scenario([0]),policy)]);assert.equal(r.detection_rate,.5);assert.equal(r.censored,1);assert.equal(r.median_ttd_keys_detected_only,50);});
test('session FAR at L retains unknown follow-up separately',()=>{
  const short=replay(scenario([0]),policy),long=replay(scenario([0,0,0,0]),policy),detected=replay(scenario([7]),{...policy,name:'B0'});
  const r=summarizeReplay([short,long,detected],150);assert.equal(r.known_at_L,2);assert.equal(r.unknown_at_L,1);assert.equal(r.far_session_at_L,.5);assert.equal(r.detection_rate_at_L,.5);
});
test('runtime rejects wrong window size and repeated window ID',()=>{
  const e=new RiskEngine(bundle.profiles['distance/SIM01'],{...policy,h1:1e8,h2:1e9});const w=data.windows.find(w=>w.window_size===50)!;
  assert.throws(()=>e.observe({...w,window_size:20}),/Window size/);e.observe(w);assert.throws(()=>e.observe(w),/repeated/);
});
test('changing test strokes cannot change fit or validation selection',()=>{
  const changed=structuredClone(data);for(const s of changed.strokes)if(s.split==='test'){s.down_ms+=10000;s.up_ms+=10000;}
  assert.deepEqual(fit(changed,tiny,{}).bundle,bundle);
});

function engineSnapshot(e:RiskEngine){
  return {state:{...e.state},status:e.status,segment:e.segment,lastDecisionMs:e.lastDecisionMs,lastWindowStartMs:e.lastWindowStartMs,seenWindows:[...e.seenWindows]};
}
test('rejected observation leaves engine unchanged and corrected window can be retried',()=>{
  const e=new RiskEngine(bundle.profiles['distance/SIM01'],{...policy,h1:1e8,h2:1e9});
  const w=data.windows.find(w=>w.window_size===50)!,before=engineSnapshot(e);
  assert.throws(()=>e.observe({...w,dwell_median_ms:NaN}),/Nonfinite/);
  assert.deepEqual(engineSnapshot(e),before);
  e.observe(w);assert.throws(()=>e.observe(w),/repeated/);
});
test('invalid first observation of a new segment cannot reset existing accumulated risk',()=>{
  const e=new RiskEngine(bundle.profiles['distance/SIM01'],{...policy,h1:1e8,h2:1e9});
  const w=data.windows.find(w=>w.window_size===50)!;e.observe(w);e.state={s:4,cooldown:1};
  const next={...w,window_id:'next-segment',segment_id:w.segment_id+1,start_ms:w.end_ms+1,end_ms:w.end_ms+100};
  const before=engineSnapshot(e);
  assert.throws(()=>e.observe({...next,dwell_median_ms:NaN}),/Nonfinite/);
  assert.deepEqual(engineSnapshot(e),before);
  assert.equal(e.observe(next).segment_reset,true);
});
test('missing feature is not silently converted to zero, even in an inactive dimension',()=>{
  const w=data.windows[0],n=data.normalizers.profiles[`${w.participant_id}:${w.window_size}`];
  for(const value of [null,'','  ',undefined,false]){
    const invalid={...w,[FEATURES[0]]:value} as unknown as WindowRow;
    assert.throws(()=>normalize(invalid,n),/feature/);
    assert.throws(()=>normalize(invalid,{...n,active:n.active.map((v,i)=>i===0?false:v)}),/feature/);
  }
  assert.deepEqual(normalize({...w,[FEATURES[0]]:String(w[FEATURES[0]])},n),normalize(w,n));
  assert.doesNotThrow(()=>normalize({...w,[FEATURES[0]]:0},n));
});
function longHoldWindows(){
  const strokes=Array.from({length:100},(_,i)=>({...data.strokes[0],pair_id:i,down_ms:i*10,up_ms:i===0?5000:i*10+5}));
  return [featureWindow(strokes.slice(0,50),'long:0',50),featureWindow(strokes.slice(50),'long:1',50)];
}
test('long hold preserves feature times but runtime and replay schedule decisions causally',()=>{
  const windows=longHoldWindows(),p=bundle.profiles['distance/SIM01'];
  assert.deepEqual(windows.map(w=>w.end_ms),[5000,995]);
  const pcy={...policy,h1:1e8,h2:1e9},e=new RiskEngine(p,pcy),runtime=windows.map(w=>e.observe(w));
  const s=scenario([0,0],null);
  s.windows=windows.map((w,i)=>({windowId:`G0:${w.window_id}`,startMs:w.start_ms,endMs:w.end_ms,a:runtime[i].a,z:runtime[i].z,label:'genuine',observedImpostorKeys:0}));
  const r=replay(s,pcy);
  assert.deepEqual(runtime.map(w=>w.time_ms),[5000,5000]);
  assert.deepEqual(r.logs.map(w=>w.time_ms),[5000,5000]);
  assert.deepEqual(r.logs.map(w=>w.source_end_ms),[5000,995]);
  assert.deepEqual(r.logs.map(w=>w.s),runtime.map(w=>w.s));
  close(Number(windows[1].strokes_per_minute),50*60000/495);
});
test('segment reset is logged at processing time with the source boundary retained',()=>{
  const s=scenario([0,0],null);s.windows[0].endMs=500;s.windows[1].windowId='G1:next';
  const r=replay(s,policy),reset=r.events.find(e=>e.event==='SEGMENT_RESET')!;
  assert.equal(reset.time_ms,500);assert.equal(reset.source_start_ms,100);
});
test('runtime and replay agree through immediate successful MFA with a long hold',()=>{
  const p=structuredClone(bundle.profiles['distance/SIM01']);p.calibration={...p.calibration,median:-1,scale:1};
  const pcy={...policy,name:'B0' as const,h1:.5,h2:1e9},e=new RiskEngine(p,pcy),s=scenario([0,0],null);
  const observations=longHoldWindows().map(w=>{
    const result=e.observe(w);if(result.action==='MFA_CHALLENGE')e.resolveMfa(true);
    return {...result,start:w.start_ms,end:w.end_ms};
  });
  s.windows=observations.map((w,i)=>({windowId:`G0:${i}`,startMs:w.start,endMs:w.end,a:w.a,z:w.z,label:'genuine',observedImpostorKeys:0}));
  const r=replay(s,pcy);
  assert.deepEqual(r.logs.map(w=>[w.time_ms,w.s,w.action]),observations.map(w=>[w.time_ms,w.s,w.action]));
  assert.equal(r.mfaRequests,1);assert.equal(e.status,'ACTIVE');
});
test('runtime and replay still reject windows sent in reverse start order',()=>{
  const windows=longHoldWindows(),e=new RiskEngine(bundle.profiles['distance/SIM01'],{...policy,h1:1e8,h2:1e9});
  e.observe(windows[1]);const before=engineSnapshot(e);
  assert.throws(()=>e.observe(windows[0]),/order/);assert.deepEqual(engineSnapshot(e),before);
  const s=scenario([0,0],null);s.windows.reverse();assert.throws(()=>replay(s,policy),/order/);
});
test('delayed genuine alert is policy detection but has separate evidence provenance',()=>{
  const s=scenario([7],100);s.windows[0]={...s.windows[0],startMs:0,endMs:110,label:'genuine',observedImpostorKeys:1};
  const r=replay(s,{...policy,name:'B0'});
  assert.equal(r.detection,true);assert.equal(r.ttdKeys,1);assert.equal(r.detectionEvidence,'delayed_genuine_window');
  assert.equal(r.logs[0].delayed_genuine_alert,true);assert.ok(r.events.some(e=>e.event==='MFA_FAIL'));
  const m=summarizeReplay([r],1);assert.equal(m.eligible_attacks,1);assert.equal(m.delayed_genuine_alert_detections,1);assert.equal(m.detection_rate,1);
});
test('mixed and impostor detection, pre-N challenge, censoring and pre-N revoke remain distinct',()=>{
  for(const label of ['mixed','impostor'] as const){
    const s=scenario([7]);s.windows[0].label=label;
    const r=replay(s,{...policy,name:'B0'});assert.equal(r.detectionEvidence,'post_takeover_window');
    assert.equal(summarizeReplay([r]).delayed_genuine_alert_detections,0);
  }
  const before=scenario([7,0],150);before.windows[0].label='genuine';
  const challenged=replay(before,{...policy,name:'B0'});assert.equal(challenged.detection,false);assert.equal(challenged.detectionEvidence,null);assert.equal(challenged.censored,true);
  const revoked=replay(scenario([20],150),policy);assert.equal(revoked.preTakeoverRevoke,true);assert.equal(revoked.detectionEvidence,null);assert.equal(revoked.censored,false);
  const m=summarizeReplay([challenged,revoked,replay(scenario([0,0]),policy)]);
  assert.equal(m.attack_scenarios,3);assert.equal(m.eligible_attacks,2);assert.equal(m.pre_takeover_revokes,1);assert.equal(m.censored,2);
});
test('global feasibility and per-user feasibility can differ without changing policy selection',()=>{
  const good=scenario([7,0,0]),bad=scenario([0,0,0]);
  const chosen=choosePolicy({A:[good],B:[good],C:[bad],D:[bad]},[{...policy,name:'B0'}],config).selection;
  assert.equal(chosen.feasible,false);
  assert.deepEqual(Object.fromEntries(Object.entries(chosen.validationByUser).map(([u,v])=>[u,v.feasible])),{A:true,B:true,C:false,D:false});
});
test('report counts actual validation users rather than copying the global flag',()=>{
  const changed=structuredClone(bundle),users=Object.keys(changed.validationPartition).sort();
  for(const name of changed.config.scorers)for(const [i,u] of users.entries()){
    // fit deliberately shares a global selection object; replace it per profile for this fixture.
    const s=structuredClone(changed.selections[`${name}/${u}`].B0);s.feasible=false;
    s.validationByUser[u].feasible=i<2;changed.selections[`${name}/${u}`].B0=s;
  }
  const result=evaluate(data,changed);
  for(const r of result.tables.macro_policy_metrics.filter(r=>r.policy_id==='B0')){
    assert.equal(r.validation_feasible_users,2);assert.equal(r.validation_selection_feasible_all,false);
  }
});
test('evaluation requires a refit instead of inferring missing validation flags from an old bundle',()=>{
  assert.throws(()=>evaluate(data,{...bundle,version:'1.0'}),/schema outdated/);
});
