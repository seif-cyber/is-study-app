// Content lives in /content/<term>/<course>/<unit>/ and is bundled at build time.
const courseFiles = import.meta.glob('/content/*/*/course.json', { eager: true, import: 'default' });
const glossaryFiles = import.meta.glob('/content/*/*/*/glossary.json', { eager: true, import: 'default' });
const lessonFiles = import.meta.glob('/content/*/*/*/lesson.md', { query: '?raw', import: 'default' });
const summaryFiles = import.meta.glob('/content/*/*/*/summary.md', { query: '?raw', import: 'default' });
const quizFiles = import.meta.glob('/content/*/*/*/quiz.json', { import: 'default' });
const cardFiles = import.meta.glob('/content/*/*/*/cards.json', { import: 'default' });
const essayFiles = import.meta.glob('/content/*/*/*/essay.json', { import: 'default' });

export const TERMS = [{ id: 't1', title: 'الترم الأول', subtitle: 'First Semester 2025/2026' }];

export const GROUPS = { general: 'مواد عامة (General)', is: 'مواد القسم (IS)' };

export const courses = Object.entries(courseFiles)
  .map(([path, c]) => ({ ...c, term: path.split('/')[2] }))
  .sort((a, b) => a.order - b.order);

export function getCourse(id) {
  return courses.find((c) => c.id === id);
}

export function getUnit(courseId, unitId) {
  const c = getCourse(courseId);
  return c?.units.find((u) => u.id === unitId);
}

const base = (c, u) => `/content/${c.term}/${c.id}/${u}/`;

const FILES = {
  lesson: [lessonFiles, 'lesson.md'],
  summary: [summaryFiles, 'summary.md'],
  quiz: [quizFiles, 'quiz.json'],
  cards: [cardFiles, 'cards.json'],
  essay: [essayFiles, 'essay.json'],
};

function loader(kind, courseId, unitId, fallback) {
  const c = getCourse(courseId);
  const [files, name] = FILES[kind];
  const fn = c && files[base(c, unitId) + name];
  return fn ? fn() : Promise.resolve(fallback);
}

export function has(kind, courseId, unitId) {
  const c = getCourse(courseId);
  const [files, name] = FILES[kind];
  return Boolean(c && files[base(c, unitId) + name]);
}

export const loadLesson = (c, u) => loader('lesson', c, u, null);
export const loadSummary = (c, u) => loader('summary', c, u, null);
export const loadCards = (c, u) => loader('cards', c, u, []);
export const loadEssay = (c, u) => loader('essay', c, u, []);

// Questions get a stable id: course/unit/index.
export async function loadQuiz(courseId, unitId) {
  const raw = await loader('quiz', courseId, unitId, []);
  const u = getUnit(courseId, unitId);
  return raw.map((q, i) => ({ ...q, id: `${courseId}/${unitId}/${i}`, course: courseId, unit: unitId, unitTitle: u?.title }));
}

export function glossary() {
  const out = [];
  for (const [path, list] of Object.entries(glossaryFiles)) {
    const [, , , courseId, unitId] = path.split('/');
    for (const g of list) out.push({ ...g, course: courseId, unit: unitId });
  }
  return out.sort((a, b) => a.en.localeCompare(b.en));
}

export async function allLessons() {
  const out = [];
  for (const c of courses) {
    for (const u of c.units) {
      const md = await loadLesson(c.id, u.id);
      if (md) out.push({ course: c, unit: u, md });
    }
  }
  return out;
}

export function driveUrl(id, mode = 'preview') {
  return `https://drive.google.com/file/d/${id}/${mode}`;
}
