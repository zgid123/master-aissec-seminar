import {normalize} from './data.ts';
import {score} from './scorers.ts';
import {step} from './policy.ts';
import {decisionTime} from './timing.ts';
import type {Profile,Policy,WindowRow} from './types.ts';

/** Adapter for TV1. Caller supplies windows from member2, no labels or takeover markers. */
export class RiskEngine {
  profile:Profile;policy:Policy;
  state:{s:number;cooldown:number}={s:0,cooldown:0};
  status:'ACTIVE'|'MFA_PENDING'|'REVOKED'='ACTIVE';
  segment:string|null=null;
  lastDecisionMs=-Infinity;
  lastWindowStartMs=-Infinity;
  seenWindows=new Set<string>();
  constructor(profile:Profile,policy:Policy){
    if(!(profile.calibration.scale>0)||!Number.isFinite(profile.calibration.median))throw new Error('Invalid score calibration');
    this.profile=structuredClone(profile);this.policy={...policy};
    step(0,{s:0,cooldown:0},policy);
  }
  observe(w:WindowRow){
    if(this.status!=='ACTIVE')throw new Error(`Cannot observe in ${this.status}; resolve MFA or start a new session`);
    if(w.window_size!==this.profile.windowSize)throw new Error('Window size differs from trained profile');
    if(this.seenWindows.has(w.window_id))throw new Error('Invalid or repeated window order');
    const timeMs=decisionTime(w.start_ms,w.end_ms,this.lastWindowStartMs,this.lastDecisionMs);
    const segment=`${w.session_id}:${w.segment_id}`;
    const segmentReset=this.segment!==null&&this.segment!==segment;
    const previousState=segmentReset?{s:0,cooldown:0}:this.state;
    const a=score(this.profile.scorer,normalize(w,this.profile.normalizer));
    const z=(a-this.profile.calibration.median)/this.profile.calibration.scale;
    const r=step(z,previousState,this.policy);
    // Commit only after validation, scoring and policy evaluation have all succeeded.
    this.segment=segment;this.lastWindowStartMs=w.start_ms;this.lastDecisionMs=timeMs;this.seenWindows.add(w.window_id);
    this.state={s:r.s,cooldown:r.cooldown};
    if(r.action==='REVOKE')this.status='REVOKED';
    if(r.action==='MFA_CHALLENGE')this.status='MFA_PENDING';
    return {window_id:w.window_id,time_ms:timeMs,source_start_ms:w.start_ms,source_end_ms:w.end_ms,a,z,s:r.s,h1:this.policy.h1,h2:this.policy.h2,action:r.action,status:this.status,segment_reset:segmentReset};
  }
  resolveMfa(passed:boolean){
    if(this.status!=='MFA_PENDING')throw new Error('No pending MFA');
    if(passed){this.state={s:0,cooldown:this.policy.cooldownWindows};this.status='ACTIVE';}
    else this.status='REVOKED';
    return {status:this.status,s:this.state.s,cooldown:this.state.cooldown};
  }
}
