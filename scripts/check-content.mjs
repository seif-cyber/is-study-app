// Validates every unit under content/: quiz shape, 50 questions per lecture,
// balanced answer keys, duplicate questions, and that referenced images exist.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'content';
const LECTURE_QUESTIONS = 50;
let errors = 0;
let warnings = 0;
const err = (where, msg) => (errors++, console.log(`✗ ${where}: ${msg}`));
const warn = (where, msg) => (warnings++, console.log(`! ${where}: ${msg}`));
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

for (const term of fs.readdirSync(ROOT)) {
  for (const courseId of fs.readdirSync(path.join(ROOT, term))) {
    const dir = path.join(ROOT, term, courseId);
    const course = readJson(path.join(dir, 'course.json'));
    for (const u of course.units) {
      const ud = path.join(dir, u.id);
      const at = `${courseId}/${u.id}`;
      if (!fs.existsSync(path.join(ud, 'lesson.md'))) continue;

      const expected = u.kind === 'lecture' ? ['summary.md', 'quiz.json', 'cards.json', 'essay.json', 'glossary.json'] : ['quiz.json', 'cards.json'];
      for (const f of expected) if (!fs.existsSync(path.join(ud, f))) warn(at, `missing ${f}`);

      for (const f of ['lesson.md', 'summary.md']) {
        const p = path.join(ud, f);
        if (!fs.existsSync(p)) continue;
        for (const m of fs.readFileSync(p, 'utf8').matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
          if (!/^https?:/.test(m[1]) && !fs.existsSync(path.join('public', m[1]))) err(at, `${f} image not found: ${m[1]}`);
      }

      const qp = path.join(ud, 'quiz.json');
      if (fs.existsSync(qp)) {
        const qs = readJson(qp);
        if (u.kind === 'lecture' && qs.length !== LECTURE_QUESTIONS) err(at, `${qs.length} questions (need ${LECTURE_QUESTIONS})`);
        const seen = new Set();
        const keys = [0, 0, 0, 0];
        qs.forEach((q, i) => {
          const w = `${at} Q${i + 1}`;
          if (!q.q?.trim()) err(w, 'empty question');
          if (!Array.isArray(q.choices) || q.choices.length < 2) err(w, 'needs choices');
          else if (new Set(q.choices.map((c) => String(c).trim())).size !== q.choices.length) err(w, 'duplicate choices');
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.choices?.length || 0)) err(w, 'bad answer index');
          else keys[q.answer]++;
          if (!q.explain?.trim()) err(w, 'missing explanation');
          if (!q.topic) warn(w, 'missing topic');
          const norm = q.q.trim().toLowerCase();
          if (seen.has(norm)) err(w, 'duplicate question');
          seen.add(norm);
        });
        if (qs.length >= 20 && Math.max(...keys) > qs.length * 0.4) warn(at, `answer key unbalanced ${keys.join('/')}`);
      }

      for (const [f, fields] of [['cards.json', ['front', 'back']], ['essay.json', ['q', 'a']], ['glossary.json', ['en', 'ar']]]) {
        const p = path.join(ud, f);
        if (!fs.existsSync(p)) continue;
        readJson(p).forEach((x, i) => fields.forEach((k) => !x[k]?.trim() && err(`${at} ${f}#${i + 1}`, `missing ${k}`)));
      }
    }
  }
}
console.log(`\n${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
