export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle the choices of a question while keeping track of the right answer.
export function shuffleChoices(q) {
  const order = shuffle(q.choices.map((_, i) => i));
  return {
    ...q,
    choices: order.map((i) => q.choices[i]),
    answer: order.indexOf(q.answer),
    origIndex: order,
  };
}

// Pick n questions spread evenly over the given groups (one group per lecture).
export function pickBalanced(groups, n) {
  const pools = groups.map((g) => shuffle(g)).filter((g) => g.length);
  const out = [];
  while (out.length < n && pools.some((p) => p.length)) {
    for (const p of pools) if (p.length && out.length < n) out.push(p.pop());
  }
  return shuffle(out);
}

export const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');

export const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function daysUntil(date) {
  if (!date) return null;
  const d = new Date(date + 'T00:00:00');
  return Math.ceil((d - new Date().setHours(0, 0, 0, 0)) / 864e5);
}
