import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {emptyOutput,fileHash,json} from '../src/io.ts';

const root=fileURLToPath(new URL('../',import.meta.url));
const out=resolve(process.argv[2]??join(root,'artifacts/repro-check'));await emptyOutput(out);
for(const name of ['first','second']){
  const r=spawnSync(process.execPath,[join(root,'src/cli.ts'),'reproduce','--out',join(out,name)],{cwd:root,encoding:'utf8'});
  if(r.status!==0)throw new Error(r.stderr||r.error?.message||'Reproduction failed');
}
const checks:{file:string;sha256:string}[]=[];
for(const dir of ['fit','evaluation']){
  const a=(await readdir(join(out,'first',dir))).filter(n=>n!=='run.json').sort();
  const b=(await readdir(join(out,'second',dir))).filter(n=>n!=='run.json').sort();
  if(JSON.stringify(a)!==JSON.stringify(b))throw new Error('Output file list differs');
  for(const file of a){const rel=join(dir,file),ha=await fileHash(join(out,'first',rel)),hb=await fileHash(join(out,'second',rel));if(ha!==hb)throw new Error(`Non-reproducible ${rel}`);checks.push({file:rel.replaceAll('\\','/'),sha256:ha});}
}
await json(join(out,'verification.json'),{status:'pass',deterministicFiles:checks.length,excluded:'fit/run.json and evaluation/run.json (time, command and runtime metadata)',checks});
console.log(`PASS: ${checks.length} deterministic outputs match byte-for-byte. Receipt: ${join(out,'verification.json')}`);
