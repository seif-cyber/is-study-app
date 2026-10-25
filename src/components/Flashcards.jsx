import { useMemo, useState } from 'react';
import Markdown from './Markdown.jsx';
import { useStore, rateCard } from '../lib/store.js';
import { shuffle } from '../lib/util.js';

export default function Flashcards({ cards }) {
  const progress = useStore((s) => s.cards);
  const [onlyDue, setOnlyDue] = useState(true);
  const [round, setRound] = useState(0);
  const deck = useMemo(() => {
    const now = Date.now();
    const list = onlyDue ? cards.filter((c) => !progress[c.id] || progress[c.id].due <= now) : cards;
    return shuffle(list);
    // progress is read once per round so rating a card doesn't reshuffle the deck
  }, [cards, onlyDue, round]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const learned = cards.filter((c) => (progress[c.id]?.box || 0) >= 3).length;

  function rate(known) {
    rateCard(deck[i].id, known);
    setFlipped(false);
    setI(i + 1);
  }

  const header = (
    <div className="row between">
      <small className="muted">
        حافظ {learned} من {cards.length} كارت
      </small>
      <label className="switch">
        <input type="checkbox" checked={onlyDue} onChange={(e) => (setOnlyDue(e.target.checked), setI(0))} /> المطلوب مراجعته بس
      </label>
    </div>
  );

  if (!cards.length) return <p className="muted">مفيش كروت هنا لسه.</p>;

  if (i >= deck.length)
    return (
      <div>
        {header}
        <div className="card center">
          <p>🎉 خلصت الكروت المطلوبة دلوقتي!</p>
          <p className="muted">الكروت اللي عرفتها هترجعلك بعد أيام عشان تثبت في دماغك.</p>
          <button className="btn primary" onClick={() => (setOnlyDue(false), setI(0), setRound((r) => r + 1))}>
            راجع كل الكروت
          </button>
        </div>
      </div>
    );

  const c = deck[i];
  return (
    <div>
      {header}
      <div className="progress">
        <i style={{ width: ((i + 1) / deck.length) * 100 + '%' }} />
      </div>
      <button key={`${i}-${flipped}`} className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
        {!flipped ? (
          <div className="fc-front" dir="auto">
            <Markdown>{c.front}</Markdown>
            <small className="muted">دوس عشان تشوف الإجابة</small>
          </div>
        ) : (
          <div className="fc-back" dir="auto">
            <Markdown>{c.back}</Markdown>
          </div>
        )}
      </button>
      <div className="row gap">
        <button className="btn bad" onClick={() => rate(false)}>
          😕 لسه
        </button>
        <button className="btn good" onClick={() => rate(true)}>
          😎 عارفها
        </button>
      </div>
      <p className="center muted">
        {i + 1} / {deck.length}
      </p>
    </div>
  );
}
