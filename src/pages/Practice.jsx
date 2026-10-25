import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Tabs } from '../components/Layout.jsx';
import { getCourse } from '../lib/content.js';
import { simplex, balance, northWest, leastCost, vogel, totalCost, optimalTransport, assignment } from '../lib/or.js';

const nums = (line) => line.trim().split(/[\s,]+/).filter(Boolean);
const lines = (txt) => txt.split('\n').map((l) => l.trim()).filter(Boolean);

function Grid({ head, rows, firstCol }) {
  return (
    <div className="md table-wrap" dir="ltr">
      <table>
        {head && (
          <thead>
            <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (j === 0 && firstCol ? <th key={j}>{c}</th> : <td key={j}>{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Simplex ----------
const LP_EXAMPLES = {
  'Beaver Creek': { sense: 'max', obj: '40 50', cons: '1 2 <= 40\n4 3 <= 120' },
  'Reddy Mikks': { sense: 'max', obj: '5 4', cons: '6 4 <= 24\n1 2 <= 6\n-1 1 <= 1\n0 1 <= 2' },
  'Min (Big-M)': { sense: 'min', obj: '6 3', cons: '2 4 >= 16\n4 3 >= 24' },
};

function SimplexTab() {
  const [sense, setSense] = useState('max');
  const [obj, setObj] = useState(LP_EXAMPLES['Beaver Creek'].obj);
  const [cons, setCons] = useState(LP_EXAMPLES['Beaver Creek'].cons);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');

  const load = (k) => {
    const e = LP_EXAMPLES[k];
    setSense(e.sense); setObj(e.obj); setCons(e.cons); setRes(null); setErr('');
  };
  const solve = () => {
    try {
      const c = nums(obj);
      const cs = lines(cons).map((l) => {
        const m = l.match(/^(.*?)(<=|>=|=<|=>|=|≤|≥)\s*(-?[\d./]+)$/);
        if (!m) throw new Error(`قيد غلط: "${l}" (اكتب مثلًا: 1 2 <= 40)`);
        const a = nums(m[1]);
        if (a.length !== c.length) throw new Error(`عدد المعاملات في "${l}" لازم = ${c.length}`);
        const op = m[2] === '≤' || m[2] === '=<' ? '<=' : m[2] === '≥' || m[2] === '=>' ? '>=' : m[2];
        return { a, op, b: m[3] };
      });
      if (!c.length || !cs.length) throw new Error('اكتب دالة الهدف وقيد واحد على الأقل');
      setRes(simplex(c, cs, sense));
      setErr('');
    } catch (e) {
      setErr(e.message); setRes(null);
    }
  };
  const status = { optimal: '✅ حل أمثل', unbounded: '♾️ Unbounded (الهدف بلا حد)', infeasible: '❌ Infeasible (مفيش حل ممكن: artificial > 0)' };

  return (
    <>
      <p className="muted">بيحل بـ Simplex (Big-M للقيود ≥ و =) بالكسور ويعرض كل iteration. متغيرات ≥ 0.</p>
      <div className="row wrap gap">
        {Object.keys(LP_EXAMPLES).map((k) => <button key={k} className="btn small" onClick={() => load(k)}>{k}</button>)}
      </div>
      <label className="field">
        نوع المسألة
        <select value={sense} onChange={(e) => setSense(e.target.value)}>
          <option value="max">Maximize</option>
          <option value="min">Minimize</option>
        </select>
      </label>
      <label className="field">
        معاملات دالة الهدف (مثلًا 40 50)
        <input className="search" dir="ltr" value={obj} onChange={(e) => setObj(e.target.value)} />
      </label>
      <label className="field">
        القيود (سطر لكل قيد: معاملات ثم &lt;= أو &gt;= أو = ثم الـ RHS)
        <textarea className="notes" dir="ltr" value={cons} onChange={(e) => setCons(e.target.value)} />
      </label>
      <button className="btn primary wide" onClick={solve}>حل</button>
      {err && <p className="card" style={{ color: 'var(--bad)' }}>{err}</p>}
      {res && (
        <>
          <div className="card highlight">
            <b>{status[res.status]}</b>
            {res.status === 'optimal' && (
              <p dir="ltr" style={{ margin: '6px 0 0' }}>
                Z = <b>{res.Z}</b>
                {' | '}
                {res.names.filter((n) => n.startsWith('x')).map((n) => `${n} = ${res.sol[n]}`).join(', ')}
              </p>
            )}
          </div>
          {res.its.map((it, i) => (
            <div key={i}>
              <h4 dir="auto" style={{ margin: '14px 0 4px' }}>{it.note}</h4>
              <Grid
                head={['Basic', ...res.names, 'RHS']}
                rows={[['z', ...it.z], ...it.T.map((r, k) => [it.basis[k], ...r])]}
                firstCol
              />
            </div>
          ))}
          {sense === 'min' && <p className="muted">ملحوظة: Min Z بيتحل كـ Max(−Z)، فصف z في الجداول للـ Max، والـ Z النهائي المعروض هو الـ Z الأصلي.</p>}
        </>
      )}
    </>
  );
}

// ---------- Transportation ----------
const TR_EXAMPLES = {
  'Lec 5 (balanced)': '3 1 7 4 | 300\n2 6 5 9 | 400\n8 3 3 2 | 500\n250 350 400 200',
  'Unbalanced (dummy)': '5 1 8 7 5 | 15\n3 9 6 7 8 | 25\n4 2 7 6 5 | 42\n7 11 10 4 9 | 35\n30 20 15 10 20',
  'SunRay': '10 2 20 11 | 15\n12 7 9 20 | 25\n4 14 16 18 | 10\n5 15 15 15',
};

function TransportTab() {
  const [txt, setTxt] = useState(TR_EXAMPLES['Lec 5 (balanced)']);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const solve = () => {
    try {
      const ls = lines(txt);
      if (ls.length < 3) throw new Error('محتاج صفين على الأقل + سطر الـ demand');
      const body = ls.slice(0, -1).map((l) => {
        const [a, b] = l.split('|');
        if (b == null) throw new Error('كل صف لازم ينتهي بـ | ثم الـ supply');
        return [nums(a).map(Number), Number(b.trim())];
      });
      const cost = body.map((r) => r[0]);
      const supply = body.map((r) => r[1]);
      const demand = nums(ls[ls.length - 1]).map(Number);
      if ([...cost.flat(), ...supply, ...demand].some((x) => Number.isNaN(x))) throw new Error('فيه رقم غلط');
      if (cost.some((r) => r.length !== demand.length)) throw new Error('عدد التكاليف في كل صف لازم = عدد أعمدة الـ demand');
      const b = balance(cost, supply, demand);
      const v = vogel(b.c, b.s, b.d);
      const opt = optimalTransport(b.c, b.s, b.d);
      setRes({
        b, supply, demand,
        rows: [
          ['Northwest corner', northWest(b.c, b.s, b.d)],
          ['Least cost', leastCost(b.c, b.s, b.d)],
          ['Vogel (VAM)', v.x],
          ['Optimal', opt],
        ],
        steps: v.steps,
      });
      setErr('');
    } catch (e) { setErr(e.message); setRes(null); }
  };
  const show = (b, x) => (
    <Grid
      head={['', ...b.d.map((_, j) => (b.dummy === 'col' && j === b.d.length - 1 ? 'Dummy' : `D${j + 1}`)), 'Supply']}
      rows={[
        ...b.c.map((r, i) => [
          b.dummy === 'row' && i === b.c.length - 1 ? 'Dummy' : `O${i + 1}`,
          ...r.map((c, j) => (x[i][j] ? `${c} → ${x[i][j]}` : `${c}`)),
          b.s[i],
        ]),
        ['Demand', ...b.d, ''],
      ]}
      firstCol
    />
  );
  return (
    <>
      <p className="muted">بيحسب الحل الابتدائي بالـ 3 طرق + الحل الأمثل. لو العرض ≠ الطلب بيضيف dummy تلقائيًا.</p>
      <div className="row wrap gap">
        {Object.keys(TR_EXAMPLES).map((k) => <button key={k} className="btn small" onClick={() => { setTxt(TR_EXAMPLES[k]); setRes(null); setErr(''); }}>{k}</button>)}
      </div>
      <label className="field">
        كل صف: التكاليف ثم | ثم الـ supply. آخر سطر: الـ demand
        <textarea className="notes" dir="ltr" value={txt} onChange={(e) => setTxt(e.target.value)} />
      </label>
      <button className="btn primary wide" onClick={solve}>حل</button>
      {err && <p className="card" style={{ color: 'var(--bad)' }}>{err}</p>}
      {res && (
        <>
          {res.b.dummy && (
            <p className="card">
              ⚖️ المسألة unbalanced: اتضاف {res.b.dummy === 'col' ? 'عمود' : 'صف'} dummy بقيمة{' '}
              {Math.abs(res.supply.reduce((a, c) => a + c, 0) - res.demand.reduce((a, c) => a + c, 0))} وتكلفة 0.
            </p>
          )}
          {res.rows.map(([name, x]) => (
            <div key={name}>
              <h4 dir="ltr" style={{ margin: '14px 0 4px' }}>
                {name}: التكلفة = <b>{totalCost(res.b.c, x)}</b>
              </h4>
              {show(res.b, x)}
            </div>
          ))}
          <h4 style={{ margin: '14px 0 4px' }}>خطوات Vogel</h4>
          <Grid
            head={['#', 'الـ penalty الأكبر', 'في', 'الخلية', 'الكمية']}
            rows={res.steps.map((s, i) => [i + 1, s.penalty, `${s.type} ${s.index}`, `(O${s.cell[0]}, D${s.cell[1]})`, s.qty])}
          />
        </>
      )}
    </>
  );
}

// ---------- Assignment ----------
const AS_EXAMPLES = {
  'Min 5×5': { mx: false, txt: '20 15 18 20 25\n18 20 12 14 15\n21 23 25 27 25\n17 18 21 23 20\n18 18 16 19 20' },
  'Max 4×4': { mx: true, txt: '42 35 28 21\n30 25 20 15\n30 25 20 15\n24 20 16 12' },
  'Unbalanced 5×4': { mx: false, txt: '9 14 19 15\n7 17 20 19\n9 18 21 18\n10 12 18 19\n10 15 21 16' },
};

function AssignTab() {
  const [txt, setTxt] = useState(AS_EXAMPLES['Min 5×5'].txt);
  const [mx, setMx] = useState(false);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const solve = () => {
    try {
      const m = lines(txt).map((l) => nums(l).map(Number));
      if (!m.length || m.some((r) => r.length !== m[0].length || r.some(Number.isNaN))) throw new Error('كل الصفوف لازم يبقى فيها نفس العدد من الأرقام');
      setRes({ m, ...assignment(m, mx) });
      setErr('');
    } catch (e) { setErr(e.message); setRes(null); }
  };
  return (
    <>
      <p className="muted">Hungarian method. لو المصفوفة مش مربعة بيضيف dummy بتكلفة 0، وللـ Maximization بيحوّلها تلقائيًا.</p>
      <div className="row wrap gap">
        {Object.keys(AS_EXAMPLES).map((k) => <button key={k} className="btn small" onClick={() => { setTxt(AS_EXAMPLES[k].txt); setMx(AS_EXAMPLES[k].mx); setRes(null); setErr(''); }}>{k}</button>)}
      </div>
      <label className="field">
        مصفوفة التكلفة (صف لكل عامل)
        <textarea className="notes" dir="ltr" value={txt} onChange={(e) => setTxt(e.target.value)} />
      </label>
      <label className="field inline">
        <input type="checkbox" checked={mx} onChange={(e) => setMx(e.target.checked)} style={{ width: 'auto', flex: 'none' }} /> Maximization (ربح)
      </label>
      <button className="btn primary wide" onClick={solve}>حل</button>
      {err && <p className="card" style={{ color: 'var(--bad)' }}>{err}</p>}
      {res && (
        <>
          <div className="card highlight">
            <b>{mx ? 'أقصى ربح' : 'أقل تكلفة'} = {res.total}</b>
          </div>
          <Grid
            head={['العامل', 'المهمة', 'القيمة']}
            rows={res.pairs.map((p) => [p.row <= res.m.length ? p.row : 'Dummy', p.col <= res.m[0].length ? p.col : 'Dummy', p.dummy ? '0 (dummy)' : p.value])}
          />
        </>
      )}
    </>
  );
}

export default function Practice() {
  const c = getCourse(useParams().courseId);
  const [tab, setTab] = useState('simplex');
  return (
    <Page title="🧮 تدريب تفاعلي" subtitle={c?.title}>
      <Tabs
        tabs={[['simplex', 'Simplex'], ['transport', 'Transportation'], ['assign', 'Assignment']]}
        value={tab}
        onChange={setTab}
      />
      {tab === 'simplex' && <SimplexTab />}
      {tab === 'transport' && <TransportTab />}
      {tab === 'assign' && <AssignTab />}
    </Page>
  );
}
