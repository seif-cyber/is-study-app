import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function Page({ title, subtitle, back = true, children, actions }) {
  const nav = useNavigate();
  return (
    <>
      <header className="topbar">
        {back ? (
          <button className="icon-btn" onClick={() => nav(-1)} aria-label="رجوع">
            →
          </button>
        ) : (
          <span className="logo">📚</span>
        )}
        <div className="topbar-title">
          <h1 dir="auto">{title}</h1>
          {subtitle && <small dir="auto">{subtitle}</small>}
        </div>
        {actions}
      </header>
      <main className="content">{children}</main>
    </>
  );
}

const TABS = [
  ['/', '🏠', 'الرئيسية'],
  ['/mistakes', '📕', 'غلطاتي'],
  ['/stats', '📊', 'مستواي'],
  ['/glossary', '🔤', 'القاموس'],
  ['/more', '☰', 'المزيد'],
];

export function BottomNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <nav className="bottomnav">
      {TABS.map(([to, icon, label]) => (
        <NavLink key={to} to={to} end={to === '/'}>
          <span>{icon}</span>
          <small>{label}</small>
        </NavLink>
      ))}
    </nav>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(([id, label]) => (
        <button key={id} role="tab" className={value === id ? 'on' : ''} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export function Loading() {
  return <div className="loading">⏳ جاري التحميل...</div>;
}
