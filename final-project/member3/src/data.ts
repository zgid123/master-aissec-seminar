import {join,resolve,relative,isAbsolute} from 'node:path';
import {readFile,realpath} from 'node:fs/promises';
import {readCsv,readJson,fileHash} from './io.ts';
import {median,mad} from './math.ts';
import type {WindowRow,Stroke,Normalizer,Normalizers,Profile,Split,Row} from './types.ts';

export const FEATURES=['dwell','flight','down_down'].flatMap(n=>['median','iqr','mad'].map(s=>`${n}_${s}_ms`)).concat(['strokes_per_minute','pause_proportion','correction_proportion']);
export interface Dataset {windows:WindowRow[];strokes:Stroke[];sessions:Row[];normalizers:Normalizers;hashes:Record<string,string>;dataKind:string;recordingIntervals:Record<string,[number,number][]>;wallStarts:Record<string,number>}
export function normalize(w:WindowRow,n:Normalizer):number[] {
  return FEATURES.flatMap((f,j)=>{
    const value=w[f];
    if(value==null||(typeof value!=='number'&&typeof value!=='string')||(typeof value==='string'&&!value.trim()))throw new Error(`Missing or invalid feature ${f}`);
    const number=Number(value);
    if(!Number.isFinite(number))throw new Error(`Nonfinite feature ${f}`);
    return n.active[j]?[(number-n.median[j])/n.scale[j]]:[];
  });
}
export function validateNormalizers(n:Normalizers,windows:WindowRow[]):void {
  if(n.fit_split!=='train'||n.scale_factor!==1.4826||JSON.stringify(n.feature_columns)!==JSON.stringify(FEATURES))throw new Error('Normalizer contract mismatch');
  for(const [key,p] of Object.entries(n.profiles)){
    if([p.median,p.scale,p.active].some(a=>a.length!==FEATURES.length))throw new Error('Normalizer vector length');
    if(!p.active.some(Boolean))throw new Error(`No active dimensions: ${key}`);
    const cut=key.lastIndexOf(':'),target=key.slice(0,cut),size=Number(key.slice(cut+1));
    const train=windows.filter(w=>w.participant_id===target&&w.window_size===size&&w.split==='train');
    const ids=[...new Set(train.map(w=>w.session_id))].sort();
    if(JSON.stringify(ids)!==JSON.stringify([...p.training_sessions].sort())||train.length!==p.training_windows)throw new Error(`Normalizer training provenance mismatch: ${key}`);
    FEATURES.forEach((f,j)=>{
      const values=train.map(w=>Number(w[f])),m=median(values),s=1.4826*mad(values),tol=2e-7*Math.max(1,Math.abs(m),s);
      if(!Number.isFinite(p.median[j])||!Number.isFinite(p.scale[j])||p.scale[j]<0||p.active[j]!== (p.scale[j]>0)||Math.abs(p.median[j]-m)>tol||Math.abs(p.scale[j]-s)>tol)throw new Error(`Normalizer not reproduced from train: ${key}/${f}`);
    });
  }
}
export function partitionValidation(windows:WindowRow[],size:number):Record<string,{calibration:string[];tuning:string[]}> {
  const out:Record<string,{calibration:string[];tuning:string[]}>={};
  for(const target of [...new Set(windows.map(w=>w.participant_id))].sort()){
    const sessions=[...new Set(windows.filter(w=>w.participant_id===target&&w.split==='validation'&&w.window_size===size).map(w=>w.session_id))].sort();
    if(sessions.length<2)throw new Error(`Need >=2 independent validation sessions for ${target}; do not split windows to compensate`);
    const n=Math.floor(sessions.length/2);out[target]={calibration:sessions.slice(0,n),tuning:sessions.slice(n)};
  }
  return out;
}
export async function loadData(root:string,rawRoot:string,manifestPath:string):Promise<Dataset> {
  const [windows,strokes,sessions,normalizers,manifest]=await Promise.all([
    readCsv<WindowRow>(join(root,'windows.csv')),readCsv<Stroke>(join(root,'strokes.csv')),
    readCsv(join(root,'sessions.csv')),readJson<Normalizers>(join(root,'normalizers.json')),
    readJson<{file:string;participant_id:string;session_id:string;split:string;data_kind:string}[]>(manifestPath)
  ]);
  const seenIds=new Set<string>(),seenContent=new Map<string,string>(),meta=new Map<string,typeof manifest[number]>(),hashes:Record<string,string>={},recordingIntervals:Record<string,[number,number][]>= {},wallStarts:Record<string,number>={};
  for(const row of manifest){
    if(!['train','validation','test'].includes(row.split)||seenIds.has(row.session_id))throw new Error('Duplicate session or invalid split');
    const path=await realpath(resolve(rawRoot,row.file)),rel=relative(await realpath(rawRoot),path);
    if(rel==='..'||rel.startsWith('..\\')||rel.startsWith('../')||isAbsolute(rel))throw new Error('Raw source outside dataset');
    const bytes=await readFile(path),digest=await fileHash(path),data=JSON.parse(bytes.toString('utf8'));
    if(seenContent.has(digest))throw new Error(`Duplicate raw source: ${row.session_id}`);
    if(data.metadata?.session_id!==row.session_id||data.metadata?.participant_id!==row.participant_id||data.data_kind!==row.data_kind)throw new Error('Manifest/raw identity mismatch');
    let start:number|null=null;const intervals:[number,number][]=[];
    for(const event of data.events){
      if(event.type==='start'||event.type==='resume')start=event.t_ms;
      if((event.type==='boundary'||event.type==='stop')&&start!==null){intervals.push([start,event.t_ms]);start=null;}
    }
    recordingIntervals[row.session_id]=intervals;wallStarts[row.session_id]=data.events[0].t_ms;
    seenIds.add(row.session_id);seenContent.set(digest,row.session_id);meta.set(row.session_id,row);hashes[row.file]=digest;
  }
  for(const r of [...windows,...strokes,...sessions]){
    const m=meta.get(String(r.session_id));
    if(!m||r.participant_id!==m.participant_id||r.split!==m.split||r.data_kind!==m.data_kind)throw new Error('Processed row/manifest mismatch');
  }
  if(new Set(windows.map(w=>w.window_id)).size!==windows.length)throw new Error('Duplicate window ID');
  const kinds=[...new Set(manifest.map(m=>m.data_kind))];
  if(kinds.length!==1||!['real','synthetic'].includes(kinds[0]))throw new Error('Do not mix real and synthetic data');
  for(const name of ['windows.csv','strokes.csv','sessions.csv','normalizers.json'])hashes['processed/'+name]=await fileHash(join(root,name));
  const upstream=await readJson<{input_hashes:Record<string,string>;output_hashes:Record<string,string>;manifest_sha256:string}>(join(root,'run.json'));
  for(const row of manifest)if(upstream.input_hashes[row.file]!==hashes[row.file])throw new Error('Raw source differs from member2 processing receipt');
  for(const name of ['windows.csv','strokes.csv','sessions.csv','normalizers.json'])if(upstream.output_hashes[name]!==hashes['processed/'+name])throw new Error('Processed file differs from member2 receipt');
  hashes['processed/run.json']=await fileHash(join(root,'run.json'));
  hashes.manifest=await fileHash(manifestPath);
  if(upstream.manifest_sha256!==hashes.manifest)throw new Error('Manifest differs from member2 receipt');
  validateNormalizers(normalizers,windows);
  return {windows,strokes,sessions,normalizers,hashes,dataKind:kinds[0],recordingIntervals,wallStarts};
}
export function profileKey(scorer:string,target:string):string{return `${scorer}/${target}`;}
export function windowsForProfile(data:Dataset,p:Profile,split:Split,size:number):WindowRow[] {
  const allowed=split==='validation'?new Set(p.tuningSessions):null;
  return data.windows.filter(w=>w.split===split&&w.window_size===size&&(!allowed||w.participant_id!==p.target||allowed.has(w.session_id)));
}
