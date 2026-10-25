import { Link } from 'react-router-dom';
import { Page } from '../components/Layout.jsx';
import { courses, GROUPS, TERMS, getCourse, getUnit, has } from '../lib/content.js';
import { useStore, unitKey } from '../lib/store.js';
import { daysUntil } from '../lib/util.js';

export function courseProgress(c, s) {
  const units = c.units.filter((u) => has('lesson', c.id, u.id));
  const read = units.filter((u) => s.read[unitKey(c.id, u.id)]).length;
  const scores = units.map((u) => s.quiz[unitKey(c.id, u.id)]?.best).filter((x) => x != null);
  return {
    ready: units.length,
    total: c.units.length,
    read,
    avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
  };
}

export default function Home() {
  const s = useStore();
  const last = s.last && getUnit(s.last.course, s.last.unit);
  const upcoming = courses
    .flatMap((c) => ['mid', 'final'].map((k) => ({ c, k, d: daysUntil(s.exams[c.id]?.[k]) })))
    .filter((x) => x.d != null && x.d >= 0)
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);

  return (
    <Page title="مذاكرة IS" subtitle={`${TERMS[0].title} · ${TERMS[0].subtitle}`} back={false}>
      {last && (
        <Link className="card continue" to={`/c/${s.last.course}/${s.last.unit}`}>
          <small>▶️ كمّل من حيث وقفت</small>
          <b dir="auto">
            {getCourse(s.last.course).title} — {last.title}
          </b>
        </Link>
      )}
      {upcoming.length > 0 && (
        <div className="countdowns">
          {upcoming.map(({ c, k, d }) => (
            <div key={c.id + k} className="countdown">
              <b>{d === 0 ? 'النهارده!' : `${d} يوم`}</b>
              <small dir="auto">
                {k === 'mid' ? 'ميد' : 'فاينال'} {c.title}
              </small>
            </div>
          ))}
        </div>
      )}
      {Object.entries(GROUPS).map(([g, label]) => (
        <section key={g}>
          <h2 className="section-title">{label}</h2>
          <div className="grid">
            {courses
              .filter((c) => c.group === g)
              .map((c) => {
                const p = courseProgress(c, s);
                return (
                  <Link key={c.id} to={`/c/${c.id}`} className="course-card" style={{ '--c': c.color }}>
                    <span className="course-icon">{c.icon}</span>
                    <b dir="ltr">{c.title}</b>
                    <small>{c.titleAr}</small>
                    {p.ready ? (
                      <>
                        <div className="bar">
                          <i style={{ width: (p.read / p.total) * 100 + '%' }} />
                        </div>
                        <small className="muted">
                          قريت {p.read}/{p.total}
                          {p.avg != null && ` · متوسط ${p.avg}%`}
                        </small>
                      </>
                    ) : (
                      <small className="soon">⏳ الشرح قريب</small>
                    )}
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </Page>
  );
}
