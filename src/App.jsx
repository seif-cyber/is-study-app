import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BottomNav, Loading } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Course from './pages/Course.jsx';
import Unit from './pages/Unit.jsx';
import { useStore } from './lib/store.js';
import AuthGate from './components/AuthGate.jsx';

const Review = lazy(() => import('./pages/Review.jsx'));
const Mistakes = lazy(() => import('./pages/Mistakes.jsx'));
const Stats = lazy(() => import('./pages/Stats.jsx'));
const Glossary = lazy(() => import('./pages/Glossary.jsx'));
const CourseCards = lazy(() => import('./pages/CourseCards.jsx'));
const Practice = lazy(() => import('./pages/Practice.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const More = lazy(() => import('./pages/More.jsx'));
const Notes = lazy(() => import('./pages/More.jsx').then((m) => ({ default: m.Notes })));
const Search = lazy(() => import('./pages/More.jsx').then((m) => ({ default: m.Search })));
const Settings = lazy(() => import('./pages/More.jsx').then((m) => ({ default: m.Settings })));
const Install = lazy(() => import('./pages/More.jsx').then((m) => ({ default: m.Install })));

function useTheme() {
  const { theme, font } = useStore((s) => s.settings);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => (document.documentElement.dataset.theme = theme === 'auto' ? (mq.matches ? 'dark' : 'light') : theme);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);
  useEffect(() => {
    document.documentElement.style.fontSize = font + 'px';
  }, [font]);
}

export default function App() {
  useTheme();
  return (
    <AuthGate>
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/c/:courseId" element={<Course />} />
          <Route path="/c/:courseId/:unitId" element={<Unit />} />
          <Route path="/review/:courseId" element={<Review />} />
          <Route path="/cards/:courseId" element={<CourseCards />} />
          <Route path="/practice/:courseId" element={<Practice />} />
          <Route path="/mistakes" element={<Mistakes />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/more" element={<More />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/install" element={<Install />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <BottomNav />
    </HashRouter>
    </AuthGate>
  );
}
