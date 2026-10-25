import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/Layout.jsx';
import { glossary, courses } from '../lib/content.js';

export default function Glossary() {
  const all = useMemo(glossary, []);
  const [q, setQ] = useState('');
  const [course, setCourse] = useState('');
  const t = q.trim().toLowerCase();
  const list = all.filter(
    (g) => (!course || g.course === course) && (!t || g.en.toLowerCase().includes(t) || g.ar.includes(t) || g.def?.toLowerCase().includes(t)),
  );
  return (
    <Page title="🔤 قاموس المصطلحات" subtitle={`${all.length} مصطلح إنجليزي ↔ عربي`} back={false}>
      <input className="search" placeholder="ابحث بالإنجليزي أو العربي..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="row wrap gap presets">
        <button className={`chip ${!course ? 'on' : ''}`} onClick={() => setCourse('')}>
          الكل
        </button>
        {courses.map((c) => (
          <button key={c.id} className={`chip ${course === c.id ? 'on' : ''}`} onClick={() => setCourse(c.id)}>
            {c.icon} {c.short || c.title}
          </button>
        ))}
      </div>
      {list.slice(0, 300).map((g, i) => (
        <div key={i} className="card term">
          <div className="row between">
            <b dir="ltr">{g.en}</b>
            <span>{g.ar}</span>
          </div>
          {g.def && <p dir="auto">{g.def}</p>}
          <Link className="muted small" to={`/c/${g.course}/${g.unit}`}>
            {courses.find((c) => c.id === g.course)?.icon} {g.unit}
          </Link>
        </div>
      ))}
      {!list.length && <p className="muted">مفيش نتايج.</p>}
    </Page>
  );
}
