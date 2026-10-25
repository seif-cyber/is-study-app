import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Page, Tabs, Loading } from '../components/Layout.jsx';
import Markdown from '../components/Markdown.jsx';
import Quiz from '../components/Quiz.jsx';
import Flashcards from '../components/Flashcards.jsx';
import { getCourse, getUnit, loadLesson, loadSummary, loadQuiz, loadCards, loadEssay, driveUrl } from '../lib/content.js';
import { useStore, update, unitKey, recordQuiz, track } from '../lib/store.js';

export function useAsync(fn, deps) {
  const [v, setV] = useState(undefined);
  useEffect(() => {
    let alive = true;
    setV(undefined);
    fn().then((x) => alive && setV(x));
    return () => {
      alive = false;
    };
  }, deps);
  return v;
}

export function EssayList({ items }) {
  const [open, setOpen] = useState({});
  if (!items.length) return <p className="muted">مفيش أسئلة مقالي هنا لسه.</p>;
  return (
    <div>
      <button className="link" onClick={() => setOpen(Object.fromEntries(items.map((_, i) => [i, !open[0]])))}>
        {open[0] ? 'اخفي كل الإجابات' : 'اظهر كل الإجابات'}
      </button>
      {items.map((e, i) => (
        <div key={i} className="card essay">
          <div className="q-text" dir="ltr">
            <b>Q{i + 1}.</b> <Markdown>{e.q}</Markdown>
          </div>
          {e.unitTitle && <small className="chip" dir="ltr">{e.unitTitle}</small>}
          <button className="btn small" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
            {open[i] ? 'اخفي الإجابة' : '👀 الإجابة النموذجية'}
          </button>
          {open[i] && (
            <div className="answer">
              <Markdown>{e.a}</Markdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PdfViewer({ id }) {
  if (!id) return <p className="muted">الملف الأصلي مش متاح.</p>;
  return (
    <div className="pdf">
      <div className="row gap wrap">
        <a className="btn small" href={driveUrl(id, 'view')} target="_blank" rel="noreferrer">
          ↗️ افتح في Drive
        </a>
        <a className="btn small" href={`https://drive.google.com/uc?export=download&id=${id}`} target="_blank" rel="noreferrer">
          ⬇️ تحميل
        </a>
      </div>
      <iframe title="PDF" src={driveUrl(id)} allow="autoplay" />
      <small className="muted">المحاضرة الأصلية بتتفتح من Google Drive، فمحتاجة نت.</small>
    </div>
  );
}

function Notes({ k }) {
  const text = useStore((s) => s.notes[k] || '');
  const bms = useStore((s) => s.bookmarks[k] || []);
  const [, setParams] = useSearchParams();
  return (
    <div>
      <h3>⭐ الأجزاء اللي علّمت عليها</h3>
      {bms.length ? (
        <ul>
          {bms.map((b) => (
            <li key={b.id}>
              <button className="link" onClick={() => setParams({ tab: 'lesson', sec: b.id }, { replace: true })}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">دوس على ☆ جنب أي عنوان في الشرح عشان تعلّم عليه.</p>
      )}
      <h3>🗒 ملاحظاتي</h3>
      <textarea
        className="notes"
        dir="auto"
        placeholder="اكتب ملاحظاتك هنا... بتتحفظ لوحدها"
        value={text}
        onChange={(e) => update((s) => (s.notes[k] = e.target.value))}
      />
    </div>
  );
}

const TABS = [
  ['lesson', '📖 الشرح'],
  ['summary', '⚡ الملخص'],
  ['pdf', '📄 الأصل'],
  ['quiz', '❓ اختبار'],
  ['cards', '🃏 كروت'],
  ['essay', '✍️ مقالي'],
  ['notes', '🗒 ملاحظاتي'],
];

export default function Unit() {
  const { courseId, unitId } = useParams();
  const c = getCourse(courseId);
  const u = getUnit(courseId, unitId);
  const k = unitKey(courseId, unitId);
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'lesson';
  const sec = params.get('sec');
  const read = useStore((s) => s.read[k]);
  const bms = useStore((s) => s.bookmarks[k] || []);

  const lesson = useAsync(() => loadLesson(courseId, unitId), [k]);
  const summary = useAsync(() => (tab === 'summary' ? loadSummary(courseId, unitId) : Promise.resolve(null)), [k, tab]);
  const quiz = useAsync(() => (tab === 'quiz' ? loadQuiz(courseId, unitId) : Promise.resolve([])), [k, tab]);
  const cards = useAsync(
    () => (tab === 'cards' ? loadCards(courseId, unitId).then((l) => l.map((x, i) => ({ ...x, id: `${k}/${i}` }))) : Promise.resolve([])),
    [k, tab],
  );
  const essay = useAsync(() => (tab === 'essay' ? loadEssay(courseId, unitId) : Promise.resolve([])), [k, tab]);

  useEffect(() => {
    update((s) => (s.last = { course: courseId, unit: unitId, at: Date.now() }));
    track('open_unit', { course: courseId, unit: unitId });
  }, [k]);

  useEffect(() => {
    if (sec && lesson && tab === 'lesson') setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' }), 150);
  }, [sec, lesson, tab]);

  if (!c || !u) return <Page title="مش لاقي المحاضرة" />;

  const idx = c.units.indexOf(u);
  const next = c.units.slice(idx + 1).find((x) => x.kind === u.kind);

  function toggleBookmark(b) {
    update((s) => {
      const list = (s.bookmarks[k] ||= []);
      const at = list.findIndex((x) => x.id === b.id);
      at >= 0 ? list.splice(at, 1) : list.push(b);
    });
  }

  return (
    <Page title={u.title} subtitle={`${c.title}${u.titleAr ? ' · ' + u.titleAr : ''}`}>
      <Tabs tabs={TABS} value={tab} onChange={(t) => setParams({ tab: t }, { replace: true })} />
      {tab === 'lesson' &&
        (lesson === undefined ? (
          <Loading />
        ) : (
          <>
            <Markdown onHeading={toggleBookmark} bookmarks={bms}>
              {lesson}
            </Markdown>
            <div className="lesson-end">
              <button
                className={`btn ${read ? '' : 'primary'}`}
                onClick={() => update((s) => (read ? delete s.read[k] : (s.read[k] = Date.now())))}
              >
                {read ? '✅ خلصتها' : '✔️ علّم إنك خلصت الشرح'}
              </button>
              <button className="btn primary" onClick={() => (setParams({ tab: 'quiz' }), window.scrollTo(0, 0))}>
                ❓ يلا نختبر نفسنا (50 سؤال)
              </button>
              {next && (
                <Link className="btn" to={`/c/${c.id}/${next.id}`}>
                  المحاضرة اللي بعدها ←
                </Link>
              )}
            </div>
          </>
        ))}
      {tab === 'summary' && (summary === undefined ? <Loading /> : summary ? <Markdown>{summary}</Markdown> : <p className="muted">الملخص قريب.</p>)}
      {tab === 'pdf' && <PdfViewer id={u.pdf} />}
      {tab === 'quiz' && (quiz === undefined ? <Loading /> : <Quiz key={k} questions={quiz} onFinish={(p) => recordQuiz(k, p)} />)}
      {tab === 'cards' && (cards === undefined ? <Loading /> : <Flashcards cards={cards} />)}
      {tab === 'essay' && (essay === undefined ? <Loading /> : <EssayList items={essay} />)}
      {tab === 'notes' && <Notes k={k} />}
    </Page>
  );
}
