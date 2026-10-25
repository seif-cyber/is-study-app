import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Tabs, Loading } from '../components/Layout.jsx';
import Markdown from '../components/Markdown.jsx';
import Quiz from '../components/Quiz.jsx';
import Flashcards from '../components/Flashcards.jsx';
import { EssayList, useAsync } from './Unit.jsx';
import { getCourse, has, loadQuiz, loadSummary, loadEssay, loadCards } from '../lib/content.js';
import { recordQuiz, unitKey } from '../lib/store.js';
import { pickBalanced } from '../lib/util.js';

export default function Review() {
  const { courseId } = useParams();
  const c = getCourse(courseId);
  const units = c.units.filter((u) => has('lesson', c.id, u.id));
  const lectures = units.filter((u) => u.kind === 'lecture');
  const midIds = lectures.filter((u) => u.mid).map((u) => u.id);

  const [sel, setSel] = useState(() => new Set(midIds.length ? midIds : lectures.map((u) => u.id)));
  const [kind, setKind] = useState('exam');
  const [count, setCount] = useState(30);
  const [mode, setMode] = useState('practice');
  const [minutes, setMinutes] = useState(0);
  const [run, setRun] = useState(0);

  const chosen = units.filter((u) => sel.has(u.id));
  const selKey = chosen.map((u) => u.id).join(',');

  function setRange(from, to) {
    const a = lectures.findIndex((u) => u.id === from);
    const b = lectures.findIndex((u) => u.id === to);
    setSel(new Set(lectures.slice(Math.min(a, b), Math.max(a, b) + 1).map((u) => u.id)));
    setRun(0);
  }
  function toggle(id) {
    const n = new Set(sel);
    n.has(id) ? n.delete(id) : n.add(id);
    setSel(n);
    setRun(0);
  }

  const data = useAsync(async () => {
    if (!chosen.length) return [];
    if (kind === 'summary')
      return Promise.all(chosen.map(async (u) => ({ u, md: await loadSummary(c.id, u.id) })));
    if (kind === 'essay')
      return (await Promise.all(chosen.map(async (u) => (await loadEssay(c.id, u.id)).map((e) => ({ ...e, unitTitle: u.title }))))).flat();
    if (kind === 'cards')
      return (await Promise.all(chosen.map(async (u) => (await loadCards(c.id, u.id)).map((x, i) => ({ ...x, id: `${unitKey(c.id, u.id)}/${i}` }))))).flat();
    return Promise.all(chosen.map((u) => loadQuiz(c.id, u.id)));
  }, [selKey, kind]);

  const examQs = useMemo(() => (kind === 'exam' && data && run ? pickBalanced(data, count) : null), [run]);
  const total = kind === 'exam' && data ? data.reduce((a, g) => a + g.length, 0) : 0;
  const reviewKey = `${c.id}/review:${selKey}`;

  return (
    <Page title="مراجعة مخصصة" subtitle={c.title}>
      <div className="card">
        <b>1️⃣ اختار المحاضرات</b>
        <div className="row wrap gap presets">
          {midIds.length > 0 && (
            <button className="chip" onClick={() => (setSel(new Set(midIds)), setRun(0))}>
              📝 منهج الميد
            </button>
          )}
          <button className="chip" onClick={() => (setSel(new Set(lectures.map((u) => u.id))), setRun(0))}>
            🎯 فاينال (كل المحاضرات)
          </button>
          {lectures.slice(1).map((u, i) => (
            <button key={u.id} className="chip" onClick={() => setRange(lectures[0].id, u.id)}>
              أول {i + 2}
            </button>
          ))}
          <button className="chip" onClick={() => (setSel(new Set(units.map((u) => u.id))), setRun(0))}>
            كله + السكاشن
          </button>
        </div>
        <div className="checklist">
          {units.map((u) => (
            <label key={u.id} className={sel.has(u.id) ? 'on' : ''}>
              <input type="checkbox" checked={sel.has(u.id)} onChange={() => toggle(u.id)} />
              <span dir="ltr">
                {u.kind === 'section' ? '🧑‍🏫 ' : ''}
                {u.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      <b>2️⃣ نوع المراجعة</b>
      <Tabs
        tabs={[
          ['exam', '📝 امتحان تجريبي'],
          ['summary', '⚡ ملخص مركز'],
          ['essay', '✍️ أسئلة مقالي'],
          ['cards', '🃏 كروت'],
        ]}
        value={kind}
        onChange={(k) => (setKind(k), setRun(0))}
      />

      {!chosen.length ? (
        <p className="muted">اختار محاضرة واحدة على الأقل.</p>
      ) : data === undefined ? (
        <Loading />
      ) : kind === 'exam' ? (
        examQs ? (
          <Quiz key={run} questions={examQs} mode={mode} minutes={minutes} onFinish={(p) => recordQuiz(reviewKey, p)} />
        ) : (
          <div className="card">
            <label className="field">
              عدد الأسئلة (متاح {total})
              <select value={count} onChange={(e) => setCount(+e.target.value)}>
                {[10, 20, 30, 50, 75, 100].filter((n) => n < total).concat(total).map((n) => (
                  <option key={n} value={n}>
                    {n === total ? `كل الأسئلة (${n})` : n}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              الطريقة
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="practice">تدريب: الحل والشرح بعد كل سؤال</option>
                <option value="exam">امتحان: النتيجة والشرح في الآخر</option>
              </select>
            </label>
            {mode === 'exam' && (
              <label className="field">
                الوقت
                <select value={minutes} onChange={(e) => setMinutes(+e.target.value)}>
                  <option value={0}>من غير وقت</option>
                  {[15, 30, 45, 60, 90].map((m) => (
                    <option key={m} value={m}>
                      {m} دقيقة
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button className="btn primary wide" disabled={!total} onClick={() => setRun((r) => r + 1)}>
              🚀 ابدأ
            </button>
          </div>
        )
      ) : kind === 'summary' ? (
        data.map(({ u, md }) => (
          <section key={u.id} className="card">
            <h2 dir="ltr">{u.title}</h2>
            {md ? <Markdown>{md}</Markdown> : <p className="muted">الملخص قريب.</p>}
          </section>
        ))
      ) : kind === 'essay' ? (
        <EssayList items={data} />
      ) : (
        <Flashcards cards={data} />
      )}
    </Page>
  );
}
