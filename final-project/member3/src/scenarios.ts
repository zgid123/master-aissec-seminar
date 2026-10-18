import {FEATURES,normalize} from './data.ts';
import {quantile,median} from './math.ts';
import {score} from './scorers.ts';
import {decisionTime} from './timing.ts';
import type {Dataset} from './data.ts';
import type {Stroke,WindowRow,Profile,Scenario,ScoredWindow,Split,Config,Row} from './types.ts';

export function featureWindow(strokes:Stroke[],id:string,size:number):WindowRow {
  if(strokes.length!==size||size<2)throw new Error('Incomplete feature window');
  const down=strokes.map(s=>s.down_ms),up=strokes.map(s=>s.up_ms),end=Math.max(...up),duration=end-down[0];
  if(duration<=0||down.some((t,i)=>i>0&&t<down[i-1])||up.some((t,i)=>t<down[i]))throw new Error('Invalid window time');
  const row:WindowRow={...strokes[0],window_id:id,window_size:size,start_ms:down[0],end_ms:end};
  const seq=[up.map((t,i)=>t-down[i]),down.slice(1).map((t,i)=>t-up[i]),down.slice(1).map((t,i)=>t-down[i])];
  ['dwell','flight','down_down'].forEach((p,i)=>{const a=seq[i],m=median(a);row[`${p}_median_ms`]=m;row[`${p}_iqr_ms`]=quantile(a,.75)-quantile(a,.25);row[`${p}_mad_ms`]=median(a.map(t=>Math.abs(t-m)));});
  row.strokes_per_minute=size*60000/duration;
  row.pause_proportion=seq[2].filter(t=>t>2000).length/(size-1);
  row.correction_proportion=strokes.filter(s=>s.group==='correction').length/size;
  return row;
}
export function scored(w:WindowRow,p:Profile,label:ScoredWindow['label'],observedImpostorKeys=0):ScoredWindow {
  const a=score(p.scorer,normalize(w,p.normalizer));
  return {windowId:w.window_id,startMs:w.start_ms,endMs:w.end_ms,a,z:(a-p.calibration.median)/p.calibration.scale,label,observedImpostorKeys};
}
export function groups<T>(rows:T[],key:(r:T)=>string):T[][] {
  const m=new Map<string,T[]>();for(const r of rows){const k=key(r);if(!m.has(k))m.set(k,[]);m.get(k)!.push(r);}return [...m.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([,v])=>v);
}
export function makeScenarios(data:Dataset,p:Profile,split:Split,c:Config,partition:Record<string,{calibration:string[];tuning:string[]}>):Scenario[] {
  const allowed=(s:Stroke|WindowRow)=>s.split===split&&(split!=='validation'||partition[s.participant_id].tuning.includes(s.session_id));
  const out:Scenario[]=[];
  // Genuine replay is a complete session. Segments are reset boundaries, not independent people.
  for(const ws of groups(data.windows.filter(w=>allowed(w)&&w.participant_id===p.target&&w.window_size===c.windowSize),w=>w.session_id)){
    ws.sort((a,b)=>a.segment_id-b.segment_id||a.start_ms-b.start_ms);
    const session=data.sessions.find(s=>s.session_id===ws[0].session_id)!;
    const windows=ws.map(w=>({...scored(w,p,'genuine'),windowId:`G${w.segment_id}:${w.window_id}`}));
    out.push({id:`G0:${ws[0].session_id}`,target:p.target,split,kind:'G0',sourceSessions:[ws[0].session_id],sourceSegments:[...new Set(ws.map(w=>`${w.session_id}:${w.segment_id}`))],windows,t0:null,horizonKeys:0,availableHorizonMs:null,recordingSeconds:Number(session.recording_seconds),wallSeconds:Number(session.wall_seconds),recordingIntervals:data.recordingIntervals[ws[0].session_id],wallStartMs:data.wallStarts[ws[0].session_id],prefixKeys:0,suffixKeys:0,joinDownDownMs:null});
  }
  const sg=groups(data.strokes.filter(allowed),s=>`${s.session_id}:${s.segment_id}`).map(g=>g.sort((a,b)=>a.down_ms-b.down_ms||a.pair_id-b.pair_id));
  const targets=sg.filter(g=>g[0].participant_id===p.target&&g.length>=c.attack.prefixKeys);
  const impostors=sg.filter(g=>g[0].participant_id!==p.target&&g.length>=c.attack.suffixKeys);
  // All eligible ordered segment pairs; no score-dependent selection or tuning with test.
  for(const a of targets)for(const b of impostors){
    const prefix=a.slice(0,c.attack.prefixKeys),suffix=b.slice(0,c.attack.suffixKeys);
    const origin=prefix[0].down_ms,join=prefix.at(-1)!.down_ms+c.attack.joinDownDownMs;
    const joined=[...prefix.map(s=>({...s,down_ms:s.down_ms-origin,up_ms:s.up_ms-origin})),...suffix.map(s=>({...s,down_ms:s.down_ms-suffix[0].down_ms+join-origin,up_ms:s.up_ms-suffix[0].down_ms+join-origin}))];
    const id=`A1:${a[0].session_id}:G${a[0].segment_id}->${b[0].session_id}:G${b[0].segment_id}`;
    const windows:ScoredWindow[]=[];let previousStart=-Infinity,previousDecision=-Infinity;
    for(let i=0;i+c.windowSize<=joined.length;i+=c.windowSize){
      const end=i+c.windowSize,w=featureWindow(joined.slice(i,end),`${id}:W${i/c.windowSize}`,c.windowSize);
      // Keep feature end time intact; schedule availability separately, as runtime/replay do.
      const available=decisionTime(w.start_ms,w.end_ms,previousStart,previousDecision);
      previousStart=w.start_ms;previousDecision=available;
      const label=end<=prefix.length?'genuine':i>=prefix.length?'impostor':'mixed';
      // Count all valid attacker keydowns observed when decision is available, including rollover.
      const observed=joined.slice(prefix.length).filter(s=>s.down_ms<=available).length;
      windows.push(scored(w,p,label,observed));
    }
    const endMs=Math.max(...joined.map(s=>s.up_ms));
    out.push({id,target:p.target,split,kind:'A1',sourceSessions:[a[0].session_id,b[0].session_id],sourceSegments:[`${a[0].session_id}:${a[0].segment_id}`,`${b[0].session_id}:${b[0].segment_id}`],windows,t0:join-origin,horizonKeys:suffix.length,availableHorizonMs:endMs-(join-origin),recordingSeconds:endMs/1000,wallSeconds:endMs/1000,recordingIntervals:[[0,endMs]],wallStartMs:0,prefixKeys:prefix.length,suffixKeys:suffix.length,joinDownDownMs:c.attack.joinDownDownMs});
  }
  if(!out.some(s=>s.kind==='G0')||!out.some(s=>s.kind==='A1'))throw new Error(`Insufficient G0/A1 source segments for ${p.target}/${split}`);
  return out;
}
export function verifyFeatureParity(data:Dataset):Row {
  let count=0,maxRelativeError=0;
  const segments=new Map(groups(data.strokes,s=>`${s.session_id}:${s.segment_id}`).map(g=>[`${g[0].session_id}:${g[0].segment_id}`,g.sort((a,b)=>a.down_ms-b.down_ms||a.pair_id-b.pair_id)]));
  for(const ws of groups(data.windows,w=>`${w.session_id}:${w.segment_id}:${w.window_size}`)){
    ws.sort((a,b)=>a.start_ms-b.start_ms);
    const source=segments.get(`${ws[0].session_id}:${ws[0].segment_id}`)!;
    ws.forEach((w,i)=>{
      const rebuilt=featureWindow(source.slice(i*w.window_size,(i+1)*w.window_size),w.window_id,w.window_size);
      for(const f of [...FEATURES,'start_ms','end_ms']){
        const err=Math.abs(Number(rebuilt[f])-Number(w[f]))/Math.max(1,Math.abs(Number(w[f])));
        maxRelativeError=Math.max(maxRelativeError,err);
        // member2 CSV rounds source timestamps/features to 9 significant digits.
        if(err>0.002)throw new Error(`Feature parity failed: ${w.window_id}/${f}/${err}`);
      }
      count++;
    });
  }
  return {windowsChecked:count,maxRelativeError,tolerance:0.002,reason:'member2 CSV precision: 9 significant digits; reconstructs features from processed strokes, not an independent raw event parser'};
}
