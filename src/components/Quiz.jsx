import { useEffect, useMemo, useState } from 'react';
import Markdown from './Markdown.jsx';
import { shuffle, shuffleChoices, LETTERS, pct } from '../lib/util.js';
import { recordAnswer, clearMistake } from '../lib/store.js';

function Explanation({ q, picked }) {
  const why = q.why?.[q.origIndex ? q.origIndex[picked] : picked];
  return (
    <div className="explain">
      {picked !== q.answer && picked != null && (
        <div className="explain-wrong">
          ❌ إجابتك: <b dir="ltr">{q.choices[picked]}</b>
          {why && <Markdown>{why}</Markdown>}
        </div>
      )}
      <div className="explain-right">
        ✅ الإجابة الصحيحة: <b dir="ltr">{q.choices[q.answer]}</b>
      </div>
      <Markdown>{q.explain}</Markdown>
    </div>
  );
}

function Confetti() {
  const colors = ['#1d4ed8', '#16a34a', '#eab308', '#db2777', '#0891b2', '#f97316'];
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, (_, k) => ({
        k,
        c: colors[k % colors.length],
        x: `${Math.round((Math.random() - 0.5) * 700)}px`,
        y: `${Math.round(150 + Math.random() * 450)}px`,
        r: `${Math.round(Math.random() * 720)}deg`,
        d: `${Math.random() * 0.25}s`,
      })),
    [],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b) => (
        <i key={b.k} style={{ background: b.c, '--x': b.x, '--y': b.y, '--r': b.r, animationDelay: b.d }} />
      ))}
    </div>
  );
}

function CountUp({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to);
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 900);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return v;
}

function Timer({ seconds, onEnd }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) {
      onEnd();
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const m = Math.floor(left / 60);
  const s = String(left % 60).padStart(2, '0');
  return <span className={`timer ${left < 60 ? 'low' : ''}`}>⏱ {m}:{s}</span>;
}

/**
 * mode "practice": instant feedback after every answer.
 * mode "exam": answers are revealed at the end; optional time limit (minutes).
 */
export default function Quiz({ questions, mode = 'practice', minutes, onFinish, fromMistakes }) {
  const [round, setRound] = useState(0);
  const [pool, setPool] = useState(questions);
  const qs = useMemo(() => shuffle(pool).map(shuffleChoices), [pool, round]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    setI(0);
    setAnswers({});
    setDone(false);
  }, [qs]);

  if (!qs.length) return <p className="muted">مفيش أسئلة هنا لسه.</p>;

  const q = qs[i];
  const picked = answers[q.id];
  const answered = picked != null;
  const reveal = mode === 'practice' && answered;

  function choose(k) {
    if (mode === 'practice' && answered) return;
    setAnswers((a) => ({ ...a, [q.id]: k }));
    if (mode === 'practice') {
      recordAnswer(q, k === q.answer);
      if (k === q.answer && fromMistakes) clearMistake(q.id);
      setShowWhy(false);
    }
  }

  function finish() {
    if (mode === 'exam') qs.forEach((x) => answers[x.id] != null && recordAnswer(x, answers[x.id] === x.answer));
    if (fromMistakes) qs.forEach((x) => answers[x.id] === x.answer && clearMistake(x.id));
    const right = qs.filter((x) => answers[x.id] === x.answer).length;
    onFinish?.(pct(right, qs.length), right, qs.length);
    setDone(true);
    window.scrollTo(0, 0);
  }

  function restart(list) {
    setPool(list);
    setRound((r) => r + 1);
  }

  if (done) {
    const right = qs.filter((x) => answers[x.id] === x.answer);
    const wrong = qs.filter((x) => answers[x.id] !== x.answer);
    const score = pct(right.length, qs.length);
    const byGroup = {};
    for (const x of qs) {
      const k = x.topic || x.unitTitle || '—';
      const g = (byGroup[k] ||= { r: 0, n: 0 });
      g.n++;
      if (answers[x.id] === x.answer) g.r++;
    }
    return (
      <div className="quiz-result">
        {score >= 85 && <Confetti />}
        <div className={`score-ring ${score >= 85 ? 'great' : score >= 60 ? 'ok' : 'bad'}`}>
          <b>
            <CountUp to={score} />%
          </b>
          <span>
            {right.length} / {qs.length}
          </span>
        </div>
        <p className="center">
          {score >= 85 ? 'ممتاز! 🔥 كمّل كده' : score >= 60 ? 'كويس 👍 راجع الغلطات تحت' : 'محتاج تراجع الشرح تاني وترجع تحل 💪'}
        </p>
        <div className="row wrap gap">
          <button className="btn" onClick={() => restart(questions)}>🔁 حل تاني</button>
          {wrong.length > 0 && (
            <button className="btn primary" onClick={() => restart(wrong.map((w) => questions.find((o) => o.id === w.id)))}>
              ❌ حل الغلطات بس ({wrong.length})
            </button>
          )}
        </div>
        <h3>النتيجة حسب الموضوع</h3>
        <div className="topic-bars">
          {Object.entries(byGroup).map(([k, g]) => (
            <div key={k} className="topic-bar">
              <span dir="auto">{k}</span>
              <div className="bar">
                <i style={{ width: pct(g.r, g.n) + '%' }} />
              </div>
              <small>
                {g.r}/{g.n}
              </small>
            </div>
          ))}
        </div>
        {wrong.length > 0 && <h3>راجع غلطاتك ({wrong.length})</h3>}
        {wrong.map((x) => (
          <div key={x.id} className="card review-q">
            <div className="q-text" dir="ltr">
              <Markdown>{x.q}</Markdown>
            </div>
            <Explanation q={x} picked={answers[x.id]} />
          </div>
        ))}
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz">
      <div className="quiz-top">
        <span>
          سؤال {i + 1} من {qs.length}
        </span>
        {mode === 'exam' && minutes ? <Timer seconds={minutes * 60} onEnd={finish} /> : null}
        {q.unitTitle && <span className="chip" dir="ltr">{q.unitTitle}</span>}
      </div>
      <div className="progress">
        <i style={{ width: pct(i + 1, qs.length) + '%' }} />
      </div>
      <div className="card">
        <div className="q-text" dir="ltr">
          <Markdown>{q.q}</Markdown>
        </div>
        <div className="choices" dir="ltr">
          {q.choices.map((c, k) => {
            let cls = 'choice';
            if (reveal && k === q.answer) cls += ' right';
            else if (reveal && k === picked) cls += ' wrong';
            else if (!reveal && k === picked) cls += ' picked';
            return (
              <button key={k} className={cls} onClick={() => choose(k)}>
                <span className="letter">{LETTERS[k]}</span>
                <span className="choice-text">
                  <Markdown>{c}</Markdown>
                </span>
              </button>
            );
          })}
        </div>
        {reveal && picked !== q.answer && <Explanation q={q} picked={picked} />}
        {reveal && picked === q.answer && (
          <>
            <div className="explain-right big">✅ صح!</div>
            <button className="link" onClick={() => setShowWhy((v) => !v)}>
              {showWhy ? 'اخفي الشرح' : 'اشرحلي ليه 🤔'}
            </button>
            {showWhy && <Explanation q={q} picked={picked} />}
          </>
        )}
      </div>
      <div className="row gap quiz-nav">
        <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
          → السابق
        </button>
        {i < qs.length - 1 ? (
          <button className="btn primary" disabled={mode === 'practice' && !answered} onClick={() => (setI(i + 1), window.scrollTo(0, 0))}>
            التالي ←
          </button>
        ) : (
          <button className="btn primary" disabled={mode === 'practice' && !answered} onClick={finish}>
            إنهاء وعرض النتيجة 🏁
          </button>
        )}
      </div>
      {mode === 'exam' && (
        <>
          <div className="dots" dir="ltr">
            {qs.map((x, k) => (
              <button key={x.id} className={`dot ${answers[x.id] != null ? 'done' : ''} ${k === i ? 'cur' : ''}`} onClick={() => setI(k)}>
                {k + 1}
              </button>
            ))}
          </div>
          <button className="btn wide" onClick={() => (answeredCount < qs.length ? confirm(`لسه في ${qs.length - answeredCount} سؤال من غير إجابة. تنهي الامتحان؟`) && finish() : finish())}>
            تسليم الامتحان ({answeredCount}/{qs.length})
          </button>
        </>
      )}
    </div>
  );
}
