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
  meta: { updatedAt: 0 }, // last local change (used to merge with the cloud copy)
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

export function update(fn, { silent = false } = {}) {
  const next = structuredClone(state);
  fn(next);
  if (!silent) next.meta = { ...next.meta, updatedAt: Date.now() };
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep in memory */
  }
  subs.forEach((f) => f());
}

const clear = (s) => Object.keys(s).forEach((k) => delete s[k]);

export function replaceAll(data, opts) {
  update((s) => (clear(s), Object.assign(s, empty(), data, { settings: { ...empty().settings, ...data?.settings } })), opts);
}

export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}

// Activity events (unit opened, quiz finished...). The cloud module listens when sign-in is enabled.
const listeners = new Set();
export function onTrack(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function track(type, data = {}) {
  listeners.forEach((f) => {
    try {
      f(type, data);
    } catch {
      /* never break the UI because of analytics */
    }
  });
}

export function resetAll() {
  update((s) => (clear(s), Object.assign(s, empty())));
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
  const [course, unit] = key.split('/');
  track('quiz_finish', { course, unit, score: pct });
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
