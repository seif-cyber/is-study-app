import { useEffect, useMemo, useState } from 'react';
import { Page, Loading } from '../components/Layout.jsx';
import { useAuth, loadCloud } from '../lib/auth.js';
import { getCourse, getUnit } from '../lib/content.js';

const when = (ts) => {
  const d = ts?.toDate?.();
  return d ? d.toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
};
const unitName = (c, u) => {
  const cc = getCourse(c);
  return cc ? `${cc.short || cc.title} — ${getUnit(c, u)?.title || u}` : `${c}/${u}`;
};
const EVENT = { login: '🔑 دخول', open_unit: '📖 فتح', quiz_finish: '📝 امتحان' };

function Events({ uid }) {
  const [list, setList] = useState(null);
  useEffect(() => {
    loadCloud().then((m) => m.listEvents(uid)).then(setList).catch(() => setList([]));
  }, [uid]);
  if (!list) return <Loading />;
  if (!list.length) return <p className="muted small">مفيش نشاط لسه.</p>;
  return (
    <div className="md table-wrap">
      <table>
        <thead>
          <tr><th>الوقت</th><th>النشاط</th><th>التفاصيل</th><th>الجهاز</th></tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e.id}>
              <td>{when(e.at)}</td>
              <td>{EVENT[e.type] || e.type}</td>
              <td dir="auto">{e.course ? unitName(e.course, e.unit) : ''}{e.score != null ? ` · ${e.score}%` : ''}</td>
              <td dir="ltr">{e.device ? `${e.device.os} · ${e.device.browser}${e.device.pwa ? ' · app' : ''}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const a = useAuth();
  const [users, setUsers] = useState(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const load = () =>
    loadCloud()
      .then((m) => m.listUsers())
      .then(setUsers)
      .catch((e) => setErr(e.message));
  useEffect(() => {
    if (a.isAdmin) load();
  }, [a.isAdmin]);

  const shown = useMemo(
    () => (users || []).filter((u) => !q || `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase())),
    [users, q],
  );

  if (!a.user) return <Page title="🛡 الأدمن"><p className="muted">لازم تسجل دخول.</p></Page>;
  if (!a.isAdmin) return <Page title="🛡 الأدمن"><p className="muted">الصفحة دي للأدمن بس.</p></Page>;

  async function toggle(u) {
    const m = await loadCloud();
    await m.setAccess(u.uid, !u.access);
    setUsers((l) => l.map((x) => (x.uid === u.uid ? { ...x, access: !u.access } : x)));
  }

  const active = (users || []).filter((u) => u.access).length;
  return (
    <Page title="🛡 لوحة الأدمن" subtitle="الطلاب ونشاطهم">
      {err && <p className="card" style={{ color: 'var(--bad)' }}>{err}</p>}
      {!users ? (
        <Loading />
      ) : (
        <>
          <div className="stats-row">
            <div className="stat"><b>{users.length}</b><small>حساب</small></div>
            <div className="stat"><b>{active}</b><small>مفعّل</small></div>
            <div className="stat"><b>{users.length - active}</b><small>مستني تفعيل</small></div>
          </div>
          <input className="search" placeholder="🔎 دوّر بالاسم أو الإيميل" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn small" onClick={load}>🔄 تحديث</button>
          {shown.map((u) => (
            <div key={u.uid} className={`card ${u.access ? '' : 'pending'}`}>
              <div className="between">
                <div style={{ minWidth: 0 }}>
                  <b dir="auto">{u.name || '—'}</b>
                  <div className="small muted" dir="ltr" style={{ overflowWrap: 'anywhere' }}>{u.email}</div>
                </div>
                <button className={`btn small ${u.access ? 'good' : 'primary'}`} style={{ flex: 'none' }} onClick={() => toggle(u)}>
                  {u.access ? '✅ مفعّل' : 'تفعيل'}
                </button>
              </div>
              <p className="small" style={{ margin: '8px 0 4px' }}>
                آخر ظهور: {when(u.lastSeenAt)} · اتسجل: {when(u.createdAt)}
                <br />
                {u.current && <>📍 آخر حاجة فتحها: <span dir="auto">{unitName(u.current.course, u.current.unit)}</span><br /></>}
                {u.stats && (
                  <>📊 قرا {u.stats.unitsRead}/{u.stats.unitsTotal} · امتحانات {u.stats.quizzesTaken} · متوسط {u.stats.avgBest ?? '—'}% · إجابات {u.stats.answered}<br /></>
                )}
                {u.device && <span dir="ltr">📱 {u.device.os} · {u.device.browser} · {u.device.screen} · {u.device.tz}</span>}
              </p>
              <button className="link" onClick={() => setOpen(open === u.uid ? null : u.uid)}>
                {open === u.uid ? 'إخفاء النشاط' : 'عرض النشاط'}
              </button>
              {open === u.uid && <Events uid={u.uid} />}
            </div>
          ))}
        </>
      )}
    </Page>
  );
}
