import { useState } from 'react';
import { Page, Loading } from '../components/Layout.jsx';
import Quiz from '../components/Quiz.jsx';
import { useAsync } from './Unit.jsx';
import { getCourse, loadQuiz } from '../lib/content.js';
import { useStore } from '../lib/store.js';

async function loadMistakes(ids) {
  const units = [...new Set(ids.map((id) => id.split('/').slice(0, 2).join('/')))];
  const all = (await Promise.all(units.map((k) => loadQuiz(...k.split('/'))))).flat();
  const set = new Set(ids);
  return all.filter((q) => set.has(q.id));
}

export default function Mistakes() {
  const mistakes = useStore((s) => s.mistakes);
  const ids = Object.keys(mistakes);
  const [course, setCourse] = useState(null);
  const [run, setRun] = useState(0);
  const qs = useAsync(() => loadMistakes(ids), [ids.length]);

  const byCourse = {};
  for (const id of ids) byCourse[id.split('/')[0]] = (byCourse[id.split('/')[0]] || 0) + 1;

  if (run && qs) {
    const list = qs.filter((q) => !course || q.course === course);
    return (
      <Page title="امتحن نفسك في غلطاتك" subtitle="السؤال اللي تحله صح بيتشال من الكراسة">
        <Quiz key={run} questions={list} fromMistakes />
      </Page>
    );
  }

  return (
    <Page title="📕 كراسة الغلطات" subtitle="كل سؤال غلطت فيه بيتجمع هنا" back={false}>
      {!ids.length ? (
        <div className="card center">
          <p>🎉 مفيش غلطات متسجلة!</p>
          <p className="muted">أي سؤال تغلط فيه في أي اختبار هيظهر هنا عشان ترجع تحله تاني.</p>
        </div>
      ) : qs === undefined ? (
        <Loading />
      ) : (
        <>
          <button className="btn primary wide" onClick={() => (setCourse(null), setRun((r) => r + 1))}>
            🔁 حل كل غلطاتك ({ids.length})
          </button>
          {Object.entries(byCourse).map(([cid, n]) => (
            <button key={cid} className="card row between wide-btn" onClick={() => (setCourse(cid), setRun((r) => r + 1))}>
              <span dir="ltr">
                {getCourse(cid)?.icon} {getCourse(cid)?.title}
              </span>
              <span className="chip">{n} سؤال</span>
            </button>
          ))}
          <h3>أكتر أسئلة بتغلط فيها</h3>
          {qs
            .slice()
            .sort((a, b) => mistakes[b.id].count - mistakes[a.id].count)
            .slice(0, 10)
            .map((q) => (
              <div key={q.id} className="card small-q">
                <span className="chip bad">غلطت {mistakes[q.id].count}×</span>
                <span dir="ltr">{q.q.slice(0, 140)}</span>
                <small className="muted" dir="ltr">
                  {getCourse(q.course)?.title} · {q.unitTitle}
                </small>
              </div>
            ))}
        </>
      )}
    </Page>
  );
}
