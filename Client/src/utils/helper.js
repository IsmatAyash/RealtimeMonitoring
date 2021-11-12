export const formatSec = secs =>
  new Date(secs * 1000).toISOString().substr(11, 8) || 0;

export const kpiTot = (agg, kpi, data) => {
  if (agg === 'none') return null;
  if (agg === 'count') return data.length;

  const tot = data.map(x => x[kpi]).reduce((a, s) => (s += a), 0);
  if (agg === 'avg') return tot / data.length || 0;

  return tot;
};
