import { Link } from 'react-router-dom';
import { Page } from '../components/Layout.jsx';
import { courses, has } from '../lib/content.js';
import { useStore, update, unitKey } from '../lib/store.js';
import { pct, daysUntil } from '../lib/util.js';

export default function Stats() {
  const s = useStore();
  const answered = Object.values(s.qstats).reduce((a, x) => a + x.r + x.w, 0);
  const right = Object.values(s.qstats).reduce((a, x) => a + x.r, 0);

  const weakTopics = Object.entries(s.topics)
    .flatMap(([cid, ts]) => Object.entries(ts).map(([t, x]) => ({ cid, t, n: x.r + x.w, acc: pct(x.r, x.r + x.w) })))
    .filter((x) => x.n >= 3 && x.acc < 75)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 8);

  const todo = courses.flatMap((c) =>
    c.units
      .filter((u) => has('lesson', c.id, u.id))
      .map((u) => ({ c, u, best: s.quiz[unitKey(c.id, u.id)]?.best }))
      .filter((x) => x.best == null || x.best < 70),
  );

  return (
    <Page title="📊 مستواي" subtitle="تقدمك ونقط ضعفك" back={false}>
      <div className="stats-row">
        <div className="stat">
          <b>{answered}</b>
          <small>سؤال حليته</small>
        </div>
        <div className="stat">
          <b>{answered ? pct(right, answered) + '%' : '—'}</b>
          <small>نسبة الصح</small>
        </div>
        <div className="stat">
          <b>{Object.keys(s.mistakes).length}</b>
          <small>في كراسة الغلطات</small>
        </div>
      </div>

      <h2 className="section-title">🎯 ركّز على دول الأول</h2>
      {weakTopics.length ? (
        weakTopics.map((x) => (
          <div key={x.cid + x.t} className="topic-bar">
            <span dir="auto">
              {courses.find((c) => c.id === x.cid)?.icon} {x.t}
            </span>
            <div className="bar bad">
              <i style={{ width: x.acc + '%' }} />
            </div>
            <small>{x.acc}%</small>
          </div>
        ))
      ) : (
        <p className="muted">حل اختبارات أكتر وهنقولك المواضيع اللي محتاجة تركيز.</p>
      )}

      {todo.length > 0 && (
        <>
          <h2 className="section-title">📌 محاضرات محتاجة اختبار (أقل من 70% أو لسه محلتهاش)</h2>
          <div className="unit-list">
            {todo.slice(0, 8).map(({ c, u, best }) => (
              <Link key={c.id + u.id} className="unit" to={`/c/${c.id}/${u.id}?tab=quiz`}>
                <span>{c.icon}</span>
                <span className="unit-info" dir="ltr">
                  <b>{u.title}</b>
                  <small>{c.title}</small>
                </span>
                <span className="score bad">{best == null ? 'لسه' : best + '%'}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">⏳ مواعيد الامتحانات</h2>
      {courses.map((c) => (
        <div key={c.id} className="card exam-dates">
          <b dir="ltr">
            {c.icon} {c.title}
          </b>
          {['mid', 'final'].map((k) => {
            const d = daysUntil(s.exams[c.id]?.[k]);
            return (
              <label key={k} className="field inline">
                {k === 'mid' ? 'الميد' : 'الفاينال'}
                <input
                  type="date"
                  value={s.exams[c.id]?.[k] || ''}
                  onChange={(e) => update((st) => ((st.exams[c.id] ||= {})[k] = e.target.value))}
                />
                {d != null && d >= 0 && <span className="chip">{d} يوم</span>}
              </label>
            );
          })}
        </div>
      ))}

      <h2 className="section-title">📚 تقدمك في كل مادة</h2>
      {courses.map((c) => {
        const units = c.units.filter((u) => has('lesson', c.id, u.id));
        if (!units.length) return null;
        return (
          <div key={c.id} className="card">
            <b dir="ltr">
              {c.icon} {c.title}
            </b>
            {units.map((u) => {
              const best = s.quiz[unitKey(c.id, u.id)]?.best;
              return (
                <div key={u.id} className="topic-bar">
                  <span dir="ltr">{u.title}</span>
                  <div className="bar">
                    <i style={{ width: (best || 0) + '%' }} />
                  </div>
                  <small>{best == null ? '—' : best + '%'}</small>
                </div>
              );
            })}
          </div>
        );
      })}
    </Page>
  );
}
