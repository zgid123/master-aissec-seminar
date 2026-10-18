import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import type {Row} from './types.ts';

export const hash = (s:string|Buffer) => createHash('sha256').update(s).digest('hex');
export const fileHash = async(p:string) => hash(await readFile(p));
export const readJson = async<T>(p:string):Promise<T> => JSON.parse(await readFile(p,'utf8'));
export function csvParse(text:string):Record<string,string>[] {
  const records:string[][]=[]; let row:string[]=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else if(quoted)quoted=false;else if(!cell)quoted=true;else throw new Error('Malformed CSV quote');}
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x!==''))records.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(quoted)throw new Error('Unclosed CSV quote');
  if(cell||row.length){row.push(cell);records.push(row);}
  const headers=records.shift()??[]; if(new Set(headers).size!==headers.length)throw new Error('Duplicate CSV header');
  return records.map(r=>{if(r.length!==headers.length)throw new Error('CSV column count mismatch');return Object.fromEntries(headers.map((h,i)=>[h,r[i]]));});
}
const textFields=new Set(['participant_id','session_id','window_id','data_kind','split','group','claimed_profile']);
export async function readCsv<T extends Row=Row>(p:string):Promise<T[]> {
  return csvParse(await readFile(p,'utf8')).map(row=>Object.fromEntries(Object.entries(row).map(([k,v])=>[k,textFields.has(k)?v:v==='True'?true:v==='False'?false:v!==''&&Number.isFinite(Number(v))?Number(v):v]))) as T[];
}
export async function emptyOutput(p:string):Promise<void> {
  await mkdir(p,{recursive:true}); if((await readdir(p)).length)throw new Error(`Output exists and is not empty: ${p}`);
}
export async function json(p:string,v:unknown):Promise<void> {
  await writeFile(p,JSON.stringify(v,(_k,x)=>{if(typeof x==='number'&&!Number.isFinite(x))throw new Error('Nonfinite JSON');return x;},2)+'\n');
}
export async function csv(p:string,rows:Row[],columns?:string[]):Promise<void> {
  const keys=columns??[...new Set(rows.flatMap(r=>Object.keys(r)))];
  const enc=(v:unknown)=>{const s=v==null?'':String(v);return /[",\r\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;};
  await writeFile(p,[keys.map(enc).join(','),...rows.map(r=>keys.map(k=>enc(r[k])).join(','))].join('\n')+'\n');
}
export async function sourceHashes(root:string):Promise<Record<string,string>> {
  const paths=['package.json','package-lock.json','tsconfig.json',...(await readdir(join(root,'src'))).filter(x=>x.endsWith('.ts')).map(x=>'src/'+x)];
  return Object.fromEntries(await Promise.all(paths.sort().map(async p=>[p,await fileHash(join(root,p))])));
}
