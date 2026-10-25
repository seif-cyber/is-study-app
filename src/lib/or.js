// Small Operations Research solvers used by the interactive practice page.
// Exact arithmetic (BigInt fractions) so tableaus match the hand-worked ones.

const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};

export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n);
    d = BigInt(d);
    if (d < 0n) (n = -n), (d = -d);
    const g = gcd(n, d) || 1n;
    this.n = n / g;
    this.d = d / g;
  }
  static parse(s) {
    s = String(s).trim();
    if (s.includes('/')) {
      const [a, b] = s.split('/');
      return new Fr(BigInt(a), BigInt(b));
    }
    const m = s.match(/^(-?)(\d*)\.?(\d*)$/);
    if (!m || (m[2] === '' && m[3] === '')) throw new Error(`رقم غلط: ${s}`);
    const frac = m[3] || '';
    return new Fr(BigInt((m[1] || '') + (m[2] || '0') + frac), 10n ** BigInt(frac.length));
  }
  add(o) { return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  cmp(o) { const x = this.n * o.d - o.n * this.d; return x < 0n ? -1 : x > 0n ? 1 : 0; }
  isZero() { return this.n === 0n; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
}
const F = (x) => (x instanceof Fr ? x : new Fr(x));
const ZERO = new Fr(0);

// a + b*M  (M = very large positive)
class BM {
  constructor(a = ZERO, b = ZERO) { this.a = F(a); this.b = F(b); }
  add(o) { return new BM(this.a.add(o.a), this.b.add(o.b)); }
  sub(o) { return new BM(this.a.sub(o.a), this.b.sub(o.b)); }
  mulF(f) { return new BM(this.a.mul(f), this.b.mul(f)); }
  divF(f) { return new BM(this.a.div(f), this.b.div(f)); }
  cmp(o) { return this.b.cmp(o.b) || this.a.cmp(o.a); }
  isNeg() { return this.cmp(new BM()) < 0; }
  isZero() { return this.a.isZero() && this.b.isZero(); }
  toString() {
    if (this.b.isZero()) return this.a.toString();
    const bs = this.b.cmp(new Fr(1)) === 0 ? 'M' : this.b.cmp(new Fr(-1)) === 0 ? '-M' : `${this.b}M`;
    if (this.a.isZero()) return bs;
    return `${this.a}${this.b.cmp(ZERO) > 0 ? '+' : ''}${bs}`;
  }
}

/**
 * Simplex with Big-M.
 * @param {number[]|string[]} c objective coefficients
 * @param {{a:(number|string)[], op:'<='|'>='|'=', b:number|string}[]} cons
 * @param {'max'|'min'} sense
 */
export function simplex(c, cons, sense = 'max') {
  const n = c.length;
  const m = cons.length;
  const names = c.map((_, i) => `x${i + 1}`);
  const cons2 = cons.map((r) => {
    let a = r.a.map(Fr.parse);
    let b = Fr.parse(r.b);
    let op = r.op;
    if (b.cmp(ZERO) < 0) {
      a = a.map((x) => x.neg());
      b = b.neg();
      op = op === '<=' ? '>=' : op === '>=' ? '<=' : '=';
    }
    return { a, b, op };
  });
  const cols = [];
  const idx = {};
  cons2.forEach((r, i) => {
    if (r.op === '<=') { idx[`s${i}`] = n + cols.length; cols.push(`s${i + 1}`); }
    else if (r.op === '>=') {
      idx[`e${i}`] = n + cols.length; cols.push(`e${i + 1}`);
      idx[`A${i}`] = n + cols.length; cols.push(`A${i + 1}`);
    } else { idx[`A${i}`] = n + cols.length; cols.push(`A${i + 1}`); }
  });
  names.push(...cols);
  const tot = names.length;
  const cost = Array.from({ length: tot }, () => new BM());
  c.forEach((x, j) => { const v = Fr.parse(x); cost[j] = new BM(sense === 'max' ? v : v.neg()); });
  Object.entries(idx).forEach(([k, j]) => { if (k[0] === 'A') cost[j] = new BM(ZERO, new Fr(-1)); });
  const T = cons2.map((r, i) => {
    const row = Array.from({ length: tot + 1 }, () => new BM());
    r.a.forEach((x, j) => (row[j] = new BM(x)));
    if (r.op === '<=') row[idx[`s${i}`]] = new BM(new Fr(1));
    if (r.op === '>=') { row[idx[`e${i}`]] = new BM(new Fr(-1)); row[idx[`A${i}`]] = new BM(new Fr(1)); }
    if (r.op === '=') row[idx[`A${i}`]] = new BM(new Fr(1));
    row[tot] = new BM(r.b);
    return row;
  });
  const basis = cons2.map((r, i) => (r.op === '<=' ? idx[`s${i}`] : idx[`A${i}`]));
  let z = [...cost.map((x) => new BM().sub(x)), new BM()];
  basis.forEach((bj, i) => {
    const k = cost[bj].b; // artificial basic variable has cost -M: z += cost_B * row
    if (k.isZero()) return;
    z = z.map((zz, col) => new BM(zz.a, zz.b.add(k.mul(T[i][col].a))));
  });
  const snap = (note) => ({ note, T: T.map((r) => r.map(String)), z: z.map(String), basis: basis.map((b) => names[b]) });
  const its = [snap('الجدول الابتدائي')];
  let status = 'optimal';
  for (let it = 1; it <= 50; it++) {
    let j = -1;
    for (let k = 0; k < tot; k++) if (z[k].isNeg() && (j < 0 || z[k].cmp(z[j]) < 0)) j = k;
    if (j < 0) break;
    let r = -1;
    let best = null;
    for (let i = 0; i < m; i++) {
      if (T[i][j].a.cmp(ZERO) > 0 && T[i][j].b.isZero()) {
        const ratio = T[i][tot].a.div(T[i][j].a);
        if (best === null || ratio.cmp(best) < 0) { best = ratio; r = i; }
      }
    }
    if (r < 0) { status = 'unbounded'; break; }
    const piv = T[r][j].a;
    T[r] = T[r].map((x) => x.divF(piv));
    for (let i = 0; i < m; i++) {
      if (i !== r && !T[i][j].isZero()) {
        const f = T[i][j].a;
        T[i] = T[i].map((x, k) => x.sub(T[r][k].mulF(f)));
      }
    }
    const f = z[j];
    z = z.map((x, k) => x.sub(new BM(T[r][k].a.mul(f.a), T[r][k].a.mul(f.b))));
    basis[r] = j;
    its.push(snap(`Iteration ${it}: يدخل ${names[j]} (الصف ${r + 1} يخرج)`));
  }
  const last = its[its.length - 1];
  const sol = {};
  names.forEach((nm) => (sol[nm] = '0'));
  basis.forEach((b, i) => (sol[names[b]] = T[i][tot].toString()));
  const hasArt = basis.some((b, i) => names[b].startsWith('A') && !T[i][tot].isZero());
  if (status === 'optimal' && hasArt) status = 'infeasible';
  const zv = z[tot];
  const Z = sense === 'max' ? zv : new BM().sub(zv);
  return { names, its, status, sol, Z: Z.toString(), last };
}

// ---------------- Transportation ----------------
export function balance(cost, supply, demand) {
  const c = cost.map((r) => [...r]);
  const s = [...supply];
  const d = [...demand];
  const ts = s.reduce((a, b) => a + b, 0);
  const td = d.reduce((a, b) => a + b, 0);
  let dummy = null;
  if (ts > td) { c.forEach((r) => r.push(0)); d.push(ts - td); dummy = 'col'; }
  else if (td > ts) { c.push(Array(d.length).fill(0)); s.push(td - ts); dummy = 'row'; }
  return { c, s, d, dummy };
}

const zeros = (m, n) => Array.from({ length: m }, () => Array(n).fill(0));

export function northWest(cost, supply, demand) {
  const s = [...supply], d = [...demand];
  const x = zeros(s.length, d.length);
  let i = 0, j = 0;
  while (i < s.length && j < d.length) {
    const q = Math.min(s[i], d[j]);
    x[i][j] = q; s[i] -= q; d[j] -= q;
    if (s[i] === 0 && i < s.length - 1 && (d[j] !== 0 || j === d.length - 1)) i++;
    else if (d[j] === 0 && j < d.length - 1) j++;
    else if (i < s.length - 1) i++;
    else j++;
  }
  return x;
}

export function leastCost(cost, supply, demand) {
  const s = [...supply], d = [...demand];
  const x = zeros(s.length, d.length);
  const rows = new Set(s.keys()), cols = new Set(d.keys());
  while (rows.size && cols.size) {
    let bi = -1, bj = -1;
    for (const i of rows) for (const j of cols) if (bi < 0 || cost[i][j] < cost[bi][bj]) { bi = i; bj = j; }
    const q = Math.min(s[bi], d[bj]);
    x[bi][bj] += q; s[bi] -= q; d[bj] -= q;
    if (s[bi] === 0) rows.delete(bi); else cols.delete(bj);
  }
  return x;
}

export function vogel(cost, supply, demand) {
  const s = [...supply], d = [...demand];
  const x = zeros(s.length, d.length);
  const rows = new Set(s.keys()), cols = new Set(d.keys());
  const pen = (arr) => {
    const v = [...arr].sort((a, b) => a - b);
    return v.length > 1 ? v[1] - v[0] : v[0];
  };
  const steps = [];
  while (rows.size && cols.size) {
    const cand = [];
    for (const i of rows) cand.push([pen([...cols].map((j) => cost[i][j])), 'r', i]);
    for (const j of cols) cand.push([pen([...rows].map((i) => cost[i][j])), 'c', j]);
    const mx = Math.max(...cand.map((p) => p[0]));
    const [, t, k] = cand.find((p) => p[0] === mx);
    let bi, bj;
    if (t === 'r') { bi = k; bj = [...cols].reduce((a, b) => (cost[k][b] < cost[k][a] ? b : a)); }
    else { bj = k; bi = [...rows].reduce((a, b) => (cost[b][k] < cost[a][k] ? b : a)); }
    const q = Math.min(s[bi], d[bj]);
    x[bi][bj] += q; s[bi] -= q; d[bj] -= q;
    steps.push({ penalty: mx, type: t === 'r' ? 'صف' : 'عمود', index: k + 1, cell: [bi + 1, bj + 1], qty: q });
    if (s[bi] === 0 && rows.size > 1) rows.delete(bi); else if (d[bj] === 0) cols.delete(bj); else rows.delete(bi);
  }
  return { x, steps };
}

export const totalCost = (cost, x) => x.reduce((a, r, i) => a + r.reduce((b, q, j) => b + q * cost[i][j], 0), 0);

// optimal solution through min-cost flow (successive shortest paths, Bellman-Ford)
export function optimalTransport(cost, supply, demand) {
  const m = supply.length, n = demand.length;
  const N = m + n + 2, S = m + n, T = m + n + 1;
  const g = Array.from({ length: N }, () => []);
  const add = (u, v, cap, w) => {
    g[u].push({ v, cap, w, rev: g[v].length });
    g[v].push({ v: u, cap: 0, w: -w, rev: g[u].length - 1 });
  };
  for (let i = 0; i < m; i++) add(S, i, supply[i], 0);
  for (let j = 0; j < n; j++) add(m + j, T, demand[j], 0);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) add(i, m + j, Infinity, cost[i][j]);
  for (;;) {
    const dist = Array(N).fill(Infinity), prev = Array(N).fill(null);
    dist[S] = 0;
    for (let k = 0; k < N; k++) {
      let ch = false;
      for (let u = 0; u < N; u++) {
        if (dist[u] === Infinity) continue;
        g[u].forEach((e, ei) => {
          if (e.cap > 0 && dist[u] + e.w < dist[e.v]) { dist[e.v] = dist[u] + e.w; prev[e.v] = [u, ei]; ch = true; }
        });
      }
      if (!ch) break;
    }
    if (dist[T] === Infinity) break;
    let f = Infinity;
    for (let v = T; v !== S; v = prev[v][0]) f = Math.min(f, g[prev[v][0]][prev[v][1]].cap);
    for (let v = T; v !== S; v = prev[v][0]) {
      const e = g[prev[v][0]][prev[v][1]];
      e.cap -= f; g[v][e.rev].cap += f;
    }
  }
  const x = zeros(m, n);
  for (let i = 0; i < m; i++) g[i].forEach((e) => { if (e.v >= m && e.v < m + n) x[i][e.v - m] = g[e.v][e.rev].cap; });
  return x;
}

// ---------------- Assignment (Hungarian, O(n^3)) ----------------
export function assignment(matrix, maximize = false) {
  const r0 = matrix.length, c0 = matrix[0].length;
  const n = Math.max(r0, c0);
  const big = Math.max(...matrix.flat());
  const a = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = i < r0 && j < c0 ? matrix[i][j] : 0;
    a[i + 1][j + 1] = maximize ? (i < r0 && j < c0 ? big - v : big) : v;
  }
  const u = Array(n + 1).fill(0), v = Array(n + 1).fill(0), p = Array(n + 1).fill(0), way = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = Array(n + 1).fill(Infinity), used = Array(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = Infinity, j1 = 0;
      for (let j = 1; j <= n; j++) if (!used[j]) {
        const cur = a[i0][j] - u[i0] - v[j];
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= n; j++) if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
  }
  const pairs = [];
  let total = 0;
  for (let j = 1; j <= n; j++) {
    const i = p[j] - 1, jj = j - 1;
    const real = i < r0 && jj < c0;
    if (real) total += matrix[i][jj];
    pairs.push({ row: i + 1, col: jj + 1, value: real ? matrix[i][jj] : 0, dummy: !real });
  }
  pairs.sort((x, y) => x.row - y.row);
  return { pairs, total, size: n, padded: n !== r0 || n !== c0 };
}
