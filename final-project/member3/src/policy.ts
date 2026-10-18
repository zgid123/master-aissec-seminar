import type {Policy,Scenario,ReplayResult,Row} from './types.ts';
import {decisionTime} from './timing.ts';

/** Pure decision: has no source identity, true label, takeover index or MFA oracle. */
export function step(z:number,state:{s:number;cooldown:number},p:Policy):{s:number;cooldown:number;action:string} {
  if(!Number.isFinite(z)||!Number.isFinite(state.s))throw new Error('Nonfinite risk input');
  if(!(p.h1>0&&p.h2>p.h1&&p.lambda>0&&p.lambda<=1&&p.k>=0&&Number.isSafeInteger(p.cooldownWindows)&&p.cooldownWindows>=0))throw new Error('Invalid policy');
  const s=p.name==='B0'?z:Math.max(0,p.lambda*state.s+z-p.k);
  const action=s>=p.h2?'REVOKE':s>=p.h1&&state.cooldown===0?'MFA_CHALLENGE':'CONTINUE';
  return {s,cooldown:Math.max(0,state.cooldown-1),action};
}
export function replay(scenario:Scenario,p:Policy):ReplayResult {
  const logs:Row[]=[],events:Row[]=[];
  let state={s:0,cooldown:0},previousSegment='',detection=false,ttdKeys:number|null=null,ttdMs:number|null=null,preTakeoverRevoke=false,mfaRequests=0,wrongfulRevokes=0;
  let recordingObserved=scenario.recordingSeconds,wallObserved=scenario.wallSeconds;
  let previousStart=-Infinity,previousDecision=-Infinity;
  let detectionEvidence:ReplayResult['detectionEvidence']=null;
  for(const w of scenario.windows){
    const timeMs=decisionTime(w.startMs,w.endMs,previousStart,previousDecision);
    previousStart=w.startMs;previousDecision=timeMs;
    const segment=scenario.kind==='G0'?w.windowId.split(':')[0]:'A1';
    if(previousSegment&&segment!==previousSegment){state={s:0,cooldown:0};events.push({scenario_id:scenario.id,time_ms:timeMs,source_start_ms:w.startMs,event:'SEGMENT_RESET',cause:'source_segment_boundary'});}
    previousSegment=segment;
    const before={...state},r=step(w.z,state,p);state={s:r.s,cooldown:r.cooldown};
    const afterTakeover=scenario.t0!==null&&timeMs>=scenario.t0;
    const delayedGenuineAlert=afterTakeover&&w.label==='genuine'&&r.action!=='CONTINUE';
    // Event labels are available only in replay wrapper, never in step() or scorer.
    if(!detection&&afterTakeover&&r.action!=='CONTINUE'){
      detection=true;ttdMs=timeMs-scenario.t0!;ttdKeys=w.observedImpostorKeys;
      detectionEvidence=delayedGenuineAlert?'delayed_genuine_window':'post_takeover_window';
    }
    let revoke=r.action==='REVOKE';
    logs.push({scenario_id:scenario.id,target:scenario.target,policy:p.name,window_id:w.windowId,time_ms:timeMs,start_ms:w.startMs,source_end_ms:w.endMs,a:w.a,z:w.z,s_previous:before.s,s:r.s,h1:p.h1,h2:p.h2,cooldown_before:before.cooldown,action:r.action,true_label:w.label,observed_impostor_keys:w.observedImpostorKeys,after_takeover:afterTakeover,delayed_genuine_alert:delayedGenuineAlert});
    if(r.action==='MFA_CHALLENGE'){
      mfaRequests++;events.push({scenario_id:scenario.id,time_ms:timeMs,event:'MFA_REQUEST',request_id:`${scenario.id}:${w.windowId}`,cause:'risk_h1'});
      // Explicit immediate deterministic oracle. No pending interval crosses takeover.
      const pass=!afterTakeover;
      events.push({scenario_id:scenario.id,time_ms:timeMs,event:pass?'MFA_PASS':'MFA_FAIL',request_id:`${scenario.id}:${w.windowId}`,cause:'simulated_oracle'});
      if(pass)state={s:0,cooldown:p.cooldownWindows};else revoke=true;
    }
    if(revoke){
      if(!afterTakeover){wrongfulRevokes++;if(scenario.kind==='A1')preTakeoverRevoke=true;}
      events.push({scenario_id:scenario.id,time_ms:timeMs,event:'REVOKE',cause:r.action==='REVOKE'?'risk_h2':'mfa_fail'});
      // A genuine session revoked early contributes only exposure through decision.
      if(scenario.kind==='G0'){
        wallObserved=(timeMs-scenario.wallStartMs)/1000;
        recordingObserved=scenario.recordingIntervals.reduce((s,[a,b])=>s+Math.max(0,Math.min(timeMs,b)-a),0)/1000;
      }
      break;
    }
  }
  return {scenarioId:scenario.id,target:scenario.target,kind:scenario.kind,detection,detectionEvidence,ttdKeys,ttdMs,censored:scenario.kind==='A1'&&!detection&&!preTakeoverRevoke,preTakeoverRevoke,horizonKeys:scenario.horizonKeys,mfaRequests,wrongfulRevokes,observedRecordingSeconds:recordingObserved,observedWallSeconds:wallObserved,logs,events};
}
