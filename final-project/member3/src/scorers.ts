import {assertMatrix, cPath, median, rng} from './math.ts';
import type {Scorer, ScorerName, Tree} from './types.ts';

export function fitScorer(kind: ScorerName, x: number[][], options={trees:100,sampleSize:256}, seed=42): Scorer {
  assertMatrix(x);
  if(kind==='distance') return {kind,dimensions:x[0].length,center:x[0].map((_,j)=>median(x.map(r=>r[j])))};
  if(kind!=='isolation_forest')throw new Error('Unknown scorer');
  if(!Number.isSafeInteger(options.trees)||options.trees<1||!Number.isSafeInteger(options.sampleSize)||options.sampleSize<2)throw new Error('Invalid forest options');
  const random=rng(seed), psi=Math.min(options.sampleSize,x.length), maxDepth=Math.ceil(Math.log2(psi));
  function grow(rows:number[][],depth:number):Tree {
    const leaf={size:rows.length}; if(depth>=maxDepth||rows.length<=1)return leaf;
    const ranges=rows[0].map((_,j)=>{const v=rows.map(r=>r[j]);return {j,lo:Math.min(...v),hi:Math.max(...v)};}).filter(r=>r.hi>r.lo);
    if(!ranges.length)return leaf;
    const {j,lo,hi}=ranges[Math.floor(random()*ranges.length)];
    // Cut strictly above min, at most max; both child nodes must be nonempty.
    const cut=lo+(hi-lo)*(1-random()), left=rows.filter(r=>r[j]<cut),right=rows.filter(r=>r[j]>=cut);
    if(!left.length||!right.length)return leaf;
    return {size:rows.length,feature:j,cut,left:grow(left,depth+1),right:grow(right,depth+1)};
  }
  const trees=Array.from({length:options.trees},()=>{
    const indexes=Array.from({length:x.length},(_,i)=>i);
    for(let i=0;i<psi;i++){const j=i+Math.floor(random()*(x.length-i));[indexes[i],indexes[j]]=[indexes[j],indexes[i]];}
    return grow(indexes.slice(0,psi).map(i=>x[i]),0);
  });
  return {kind,dimensions:x[0].length,trees,sampleSize:psi,seed};
}
export function score(model:Scorer,x:number[]):number {
  if(x.length!==model.dimensions||x.some(v=>!Number.isFinite(v)))throw new Error('Scorer feature mismatch');
  if(model.kind==='distance') return x.reduce((s,v,j)=>s+Math.abs(v-model.center![j]),0)/x.length;
  function path(t:Tree,d:number):number {return t.feature===undefined ? d+cPath(t.size) : path(x[t.feature]<t.cut! ? t.left! : t.right!,d+1);}
  const length=model.trees!.reduce((s,t)=>s+path(t,0),0)/model.trees!.length;
  return 2**(-length/cPath(model.sampleSize!));
}
