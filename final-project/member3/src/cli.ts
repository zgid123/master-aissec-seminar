import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {loadData} from './data.ts';
import {fit,validateConfig} from './fit.ts';
import {evaluate} from './evaluate.ts';
import {verifyFeatureParity} from './scenarios.ts';
import {readJson,json,csv,emptyOutput,sourceHashes,fileHash,hash} from './io.ts';
import type {Bundle,Config} from './types.ts';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),command=args.shift();
const flags:Record<string,string>={};
for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||!args[i+1]||args[i+1].startsWith('--'))throw new Error('Use --key value');flags[args[i].slice(2)]=args[i+1];}
const known=new Set(['data','raw-root','manifest','config','out','model']);for(const f of Object.keys(flags))if(!known.has(f))throw new Error(`Unknown flag ${f}`);
const dataRoot=resolve(flags.data??join(root,'../member2/artifacts/processed'));
const rawRoot=resolve(flags['raw-root']??join(dataRoot,'..'));
const manifest=resolve(flags.manifest??join(rawRoot,'manifest.json'));
const configPath=resolve(flags.config??join(root,'config.json'));
async function provenance(out:string,inputs:Record<string,string>):Promise<void> {
  let gitCommit='unavailable',gitDirty='unavailable';
  try{gitCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();gitDirty=execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim();}catch{}
  const outputs:Record<string,string>={};for(const f of (await readdir(out)).sort())if(f!=='run.json')outputs[f]=await fileHash(join(out,f));
  await json(join(out,'run.json'),{generatedAtUtc:new Date().toISOString(),command,node:process.version,gitCommit,gitDirty,inputHashes:inputs,sourceHashes:await sourceHashes(root),outputHashes:outputs});
}
async function fitTo(out:string):Promise<Bundle> {
  const data=await loadData(dataRoot,rawRoot,manifest),config=await readJson<Config>(configPath);validateConfig(config);
  await emptyOutput(out);const {bundle,search}=fit(data,config,await sourceHashes(root));
  await json(join(out,'model.json'),bundle);await csv(join(out,'validation_search.csv'),search);
  await json(join(out,'validation_partition.json'),bundle.validationPartition);
  await json(join(out,'config.json'),config);
  await provenance(out,{...data.hashes,config:await fileHash(configPath)});
  return bundle;
}
async function evaluateTo(out:string,bundle:Bundle,modelHash:string):Promise<void> {
  const currentSources=await sourceHashes(root);if(JSON.stringify(currentSources)!==JSON.stringify(bundle.sourceHashes))throw new Error('Source changed after fit; create a new fit for this implementation');
  const data=await loadData(dataRoot,rawRoot,manifest);await emptyOutput(out);
  const {tables,report}=evaluate(data,bundle);
  for(const [name,rows] of Object.entries(tables))await csv(join(out,name+'.csv'),rows);
  await writeFile(join(out,'report.md'),report);await json(join(out,'config.json'),bundle.config);
  await provenance(out,{...data.hashes,model:modelHash});
}
try{
  if(command==='fit'){
    if(!flags.out)throw new Error('fit requires --out NEW_DIRECTORY');
    await fitTo(resolve(flags.out));console.log(`Fit complete: ${resolve(flags.out)}`);
  }else if(command==='evaluate'){
    if(!flags.out||!flags.model)throw new Error('evaluate requires --model FILE --out NEW_DIRECTORY');
    if(flags.config)throw new Error('evaluate uses frozen config inside model; --config is not allowed');
    const model=resolve(flags.model);await evaluateTo(resolve(flags.out),await readJson<Bundle>(model),await fileHash(model));console.log(`Evaluation complete: ${resolve(flags.out)}`);
  }else if(command==='verify'){
    const data=await loadData(dataRoot,rawRoot,manifest);console.log(JSON.stringify({status:'pass',dataKind:data.dataKind,...verifyFeatureParity(data)},null,2));
  }else if(command==='reproduce'){
    if(!flags.out)throw new Error('reproduce requires --out NEW_DIRECTORY');const out=resolve(flags.out);await emptyOutput(out);
    const fitOut=join(out,'fit'),bundle=await fitTo(fitOut);
    await evaluateTo(join(out,'evaluation'),bundle,await fileHash(join(fitOut,'model.json')));
    console.log(`Reproduction complete: ${out}`);
  }else{
    console.log('Node >=24. Commands: verify | fit --out DIR | evaluate --model FILE --out DIR | reproduce --out DIR');
    console.log('Optional data flags: --data PROCESSED --raw-root ARTIFACTS --manifest FILE. fit/reproduce: --config FILE.');
    if(command)process.exitCode=1;
  }
}catch(error){console.error(error instanceof Error?error.message:String(error));process.exitCode=1;}
