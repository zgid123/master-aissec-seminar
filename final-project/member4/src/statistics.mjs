export function summarize(values) {
  if (values.some(value => !Number.isFinite(value))) {
    throw new Error('Summary requires finite numbers.');
  }
  if (!values.length) {
    return { n: 0, median: null, q1: null, q3: null, iqr: null, mean: null, reason: 'no_observations' };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const quantile = q => {
    const index = (sorted.length - 1) * q;
    const lo = Math.floor(index);
    return sorted[lo] + (sorted[Math.ceil(index)] - sorted[lo]) * (index - lo);
  };
  const q1 = quantile(0.25);
  const q3 = quantile(0.75);
  return {
    n: values.length, median: quantile(0.5), q1, q3, iqr: q3 - q1,
    mean: values.reduce((sum, value) => sum + value, 0) / values.length, reason: null,
  };
}

export function seededRandom(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new Error('Seed must be a uint32.');
  }
  let state = seed;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function bootstrapMeanDifference(differences, seed, iterations = 2000) {
  const random = seededRandom(seed);
  if (!Number.isInteger(iterations) || iterations < 100 || iterations > 100000) {
    throw new Error('Bootstrap iterations must be an integer from 100 to 100000.');
  }
  summarize(differences);
  if (differences.length < 2) {
    return { low: null, high: null, reason: 'fewer_than_two_paired_users' };
  }
  const means = [];
  for (let b = 0; b < iterations; b++) {
    let sum = 0;
    for (let i = 0; i < differences.length; i++) {
      sum += differences[Math.floor(random() * differences.length)];
    }
    means.push(sum / differences.length);
  }
  means.sort((a, b) => a - b);
  const percentile = q => {
    const index = (means.length - 1) * q;
    const lo = Math.floor(index);
    return means[lo] + (means[Math.ceil(index)] - means[lo]) * (index - lo);
  };
  return {
    low: percentile(0.025), high: percentile(0.975), reason: null,
    confidence: 0.95, estimator: 'mean_paired_user_difference', method: 'percentile',
    seed, iterations, warning: differences.length < 6 ? 'small_user_sample' : null,
  };
}

export function signedRank(differences) {
  summarize(differences);
  const ordered = differences.filter(value => value !== 0)
    .map(value => ({ value, magnitude: Math.abs(value), rank2: 0 }))
    .sort((a, b) => a.magnitude - b.magnitude);
  const n = ordered.length;
  if (n > 50) throw new Error('Exact signed-rank supports at most 50 nonzero pairs.');
  let hasTies = false;
  for (let i = 0; i < n;) {
    let j = i + 1;
    while (j < n && ordered[j].magnitude === ordered[i].magnitude) j++;
    hasTies ||= j - i > 1;
    for (let k = i; k < j; k++) ordered[k].rank2 = i + 1 + j;
    i = j;
  }
  const positive2 = ordered.filter(row => row.value > 0).reduce((sum, row) => sum + row.rank2, 0);
  const total2 = ordered.reduce((sum, row) => sum + row.rank2, 0);
  const result = {
    n_nonzero: n, n_zero: differences.length - n, ties: hasTies,
    w_plus: positive2 / 2, w_minus: (total2 - positive2) / 2,
    rank_biserial: n ? (2 * positive2 - total2) / total2 : null,
    p_two_sided: null, method: 'exact_conditional_sign_permutation_midrank_wilcox_zeros',
    reason: null,
  };
  if (n < 2) return { ...result, reason: n === 0 ? 'all_differences_zero_or_empty' : 'fewer_than_two_nonzero_pairs' };

  // Doubled midranks are integers, so subset-sum counts handle ties exactly.
  const counts = Array(total2 + 1).fill(0);
  counts[0] = 1;
  let reached = 0;
  for (const { rank2 } of ordered) {
    for (let sum = reached; sum >= 0; sum--) counts[sum + rank2] += counts[sum];
    reached += rank2;
  }
  const tail = Math.min(positive2, total2 - positive2);
  const probability = counts.slice(0, tail + 1).reduce((sum, count) => sum + count, 0) / 2 ** n;
  return { ...result, p_two_sided: Math.min(1, 2 * probability) };
}
