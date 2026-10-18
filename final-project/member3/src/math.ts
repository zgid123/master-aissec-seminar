export function quantile(xs: number[], q: number): number {
  if (!xs.length || xs.some(x => !Number.isFinite(x)) || q < 0 || q > 1)
    throw new Error('Quantile requires nonempty finite input and q in [0,1]');
  const a = [...xs].sort((x,y) => x-y), p = (a.length-1)*q, i = Math.floor(p);
  return a[i] + (p-i)*((a[i+1] ?? a[i])-a[i]);
}
export const median = (a: number[]) => quantile(a, 0.5);
export const mean = (a: number[]) => a.length ? a.reduce((s,x)=>s+x,0)/a.length : null;
export const mad = (a: number[]) => { const m=median(a); return median(a.map(x=>Math.abs(x-m))); };
export const nullableMedian = (a: number[]) => a.length ? median(a) : null;
export function rng(seed: number): () => number {
  let s=seed>>>0;
  return () => { s=(s+0x6d2b79f5)>>>0; let t=s; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
}
export function seedFor(seed: number, key: string): number {
  let h=seed>>>0; for (const c of key) h=Math.imul(h^c.charCodeAt(0),16777619)>>>0; return h;
}
export function cPath(n: number): number {
  if(n<=1)return 0; let h=0; for(let i=1;i<n;i++)h+=1/i; return 2*h-2*(n-1)/n;
}
export function assertMatrix(x: number[][]): void {
  if(x.length<2 || !x[0].length || x.some(r=>r.length!==x[0].length || r.some(v=>!Number.isFinite(v))))
    throw new Error('Model requires >=2 finite rows and >=1 active feature');
}
