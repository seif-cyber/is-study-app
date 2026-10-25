import { useSyncExternalStore } from 'react';

// All progress is kept on the device in one localStorage entry.
const KEY = 'isapp:v1';
const empty = () => ({
  quiz: {},      // unitKey -> { best, last, attempts }
  qstats: {},    // questionId -> { r, w }
  mistakes: {},  // questionId -> { count, at }
  topics: {},    // course -> topic -> { r, w }
  cards: {},     // cardId -> { box, due }
  notes: {},     // unitKey -> text
  bookmarks: {}, // unitKey -> [ { id, title } ]
  read: {},      // unitKey -> timestamp
  exams: {},     // course -> { mid, final }
  settings: { theme: 'auto', font: 17 },
});

function read() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return s ? { ...empty(), ...s, settings: { ...empty().settings, ...s.settings } } : empty();
  } catch {
    return empty();
  }
}

let state = read();
const subs = new Set();

export function getState() {
  return state;
}

export function update(fn) {
  const next = structuredClone(state);
  fn(next);
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep in memory */
  }
  subs.forEach((f) => f());
}

export function replaceAll(data) {
  update((s) => Object.assign(s, empty(), data));
}

export function resetAll() {
  update((s) => Object.assign(s, empty()));
}

export function useStore(selector = (s) => s) {
  return selector(useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), getState));
}

export const unitKey = (course, unit) => `${course}/${unit}`;

export function recordAnswer(q, correct) {
  update((s) => {
    const st = (s.qstats[q.id] ||= { r: 0, w: 0 });
    correct ? st.r++ : st.w++;
    if (q.topic) {
      const t = ((s.topics[q.course] ||= {})[q.topic] ||= { r: 0, w: 0 });
      correct ? t.r++ : t.w++;
    }
    if (!correct) {
      const m = (s.mistakes[q.id] ||= { count: 0 });
      m.count++;
      m.at = Date.now();
    }
  });
}

export function clearMistake(id) {
  update((s) => {
    delete s.mistakes[id];
  });
}

export function recordQuiz(key, pct) {
  update((s) => {
    const r = (s.quiz[key] ||= { best: 0, attempts: 0 });
    r.best = Math.max(r.best, pct);
    r.last = pct;
    r.attempts++;
  });
}

// Leitner boxes: box n is due again after INTERVALS[n] days.
const INTERVALS = [0, 1, 3, 7, 14, 30];
export function rateCard(id, known) {
  update((s) => {
    const c = (s.cards[id] ||= { box: 0 });
    c.box = known ? Math.min(c.box + 1, INTERVALS.length - 1) : 0;
    c.due = Date.now() + INTERVALS[c.box] * 864e5;
  });
}
