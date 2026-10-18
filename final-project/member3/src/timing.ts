/** Process windows in keydown order, waiting for all earlier windows to be complete. */
export function decisionTime(startMs:number,endMs:number,previousStartMs:number,previousDecisionMs:number):number {
  if(!Number.isFinite(startMs)||!Number.isFinite(endMs)||endMs<startMs||startMs<previousStartMs)throw new Error('Invalid window time or order');
  return Math.max(endMs,previousDecisionMs);
}
