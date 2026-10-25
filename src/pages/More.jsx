import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Loading } from '../components/Layout.jsx';
import { useAsync } from './Unit.jsx';
import { allLessons, getCourse, getUnit, courses } from '../lib/content.js';
import { useStore, update, replaceAll, resetAll, getState } from '../lib/store.js';

export default function More() {
  return (
    <Page title="المزيد" back={false}>
      <div className="menu">
        <Link to="/search">🔎 بحث في كل الشروحات</Link>
        <Link to="/notes">🗒 ملاحظاتي والعلامات ⭐</Link>
        <Link to="/settings">⚙️ الإعدادات والنسخة الاحتياطية</Link>
        <Link to="/install">📲 إزاي أثبّت الأبلكيشن على موبايلي</Link>
      </div>
      <p className="muted center small">
        IS Study · {courses.length} مواد · الترم الأول 2025/2026
      </p>
    </Page>
  );
}

export function Notes() {
  const s = useStore();
  const keys = [...new Set([...Object.keys(s.notes).filter((k) => s.notes[k].trim()), ...Object.keys(s.bookmarks).filter((k) => s.bookmarks[k].length)])];
  return (
    <Page title="🗒 ملاحظاتي والعلامات">
      {!keys.length && <p className="muted">لسه مكتبتش ملاحظات ولا علّمت على أجزاء. افتح أي محاضرة وجرب ☆ أو تاب "ملاحظاتي".</p>}
      {keys.map((k) => {
        const [cid, uid] = k.split('/');
        const u = getUnit(cid, uid);
        return (
          <div key={k} className="card">
            <Link to={`/c/${cid}/${uid}`}>
              <b dir="ltr">
                {getCourse(cid)?.icon} {getCourse(cid)?.title} — {u?.title}
              </b>
            </Link>
            {(s.bookmarks[k] || []).map((b) => (
              <div key={b.id}>
                <Link to={`/c/${cid}/${uid}?tab=lesson&sec=${b.id}`}>⭐ {b.title}</Link>
              </div>
            ))}
            {s.notes[k]?.trim() && (
              <p className="note-text" dir="auto">
                {s.notes[k]}
              </p>
            )}
          </div>
        );
      })}
    </Page>
  );
}

function snippet(md, t) {
  const plain = md.replace(/[#>*`|_\[\]()!-]+/g, ' ').replace(/\s+/g, ' ');
  const i = plain.toLowerCase().indexOf(t);
  return i < 0 ? null : (i > 60 ? '…' : '') + plain.slice(Math.max(0, i - 60), i + 100) + '…';
}

export function Search() {
  const lessons = useAsync(allLessons, []);
  const [q, setQ] = useState('');
  const t = q.trim().toLowerCase();
  const hits = t.length >= 2 && lessons ? lessons.map((l) => ({ ...l, snip: snippet(l.md, t) })).filter((l) => l.snip) : [];
  return (
    <Page title="🔎 بحث">
      <input className="search" autoFocus placeholder="مثلاً: deadlock أو المقاطعة..." value={q} onChange={(e) => setQ(e.target.value)} />
      {lessons === undefined && <Loading />}
      {hits.map(({ course, unit, snip }) => (
        <Link key={course.id + unit.id} className="card" to={`/c/${course.id}/${unit.id}`}>
          <b dir="ltr">
            {course.icon} {course.title} — {unit.title}
          </b>
          <p className="muted" dir="auto">
            {snip}
          </p>
        </Link>
      ))}
      {t.length >= 2 && lessons && !hits.length && <p className="muted">مفيش نتايج.</p>}
    </Page>
  );
}

export function Settings() {
  const settings = useStore((s) => s.settings);
  const set = (k, v) => update((s) => (s.settings[k] = v));

  function exportData() {
    const blob = new Blob([JSON.stringify(getState(), null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `is-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }
  function importData(e) {
    const f = e.target.files[0];
    if (!f) return;
    f.text().then((t) => {
      try {
        replaceAll(JSON.parse(t));
        alert('✅ تم استرجاع النسخة الاحتياطية');
      } catch {
        alert('❌ الملف ده مش نسخة احتياطية صحيحة');
      }
    });
  }

  return (
    <Page title="⚙️ الإعدادات">
      <div className="card">
        <label className="field">
          المظهر
          <select value={settings.theme} onChange={(e) => set('theme', e.target.value)}>
            <option value="auto">تلقائي (زي الموبايل)</option>
            <option value="light">فاتح ☀️</option>
            <option value="dark">غامق 🌙</option>
          </select>
        </label>
        <label className="field">
          حجم الخط: {settings.font}
          <input type="range" min="14" max="22" value={settings.font} onChange={(e) => set('font', +e.target.value)} />
        </label>
      </div>
      <div className="card">
        <b>💾 النسخة الاحتياطية</b>
        <p className="muted small">تقدمك محفوظ على الموبايل ده بس. خد نسخة احتياطية لو هتغير الموبايل أو تمسح المتصفح.</p>
        <div className="row wrap gap">
          <button className="btn" onClick={exportData}>
            ⬇️ حفظ نسخة
          </button>
          <label className="btn">
            ⬆️ استرجاع نسخة
            <input type="file" accept="application/json" hidden onChange={importData} />
          </label>
          <button className="btn bad" onClick={() => confirm('هتمسح كل تقدمك وملاحظاتك. متأكد؟') && resetAll()}>
            🗑 مسح كل التقدم
          </button>
        </div>
      </div>
    </Page>
  );
}

export function Install() {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  return (
    <Page title="📲 تثبيت الأبلكيشن">
      {standalone && <div className="callout callout-tip">✅ الأبلكيشن متثبت عندك بالفعل.</div>}
      <div className={`card ${ios ? 'highlight' : ''}`}>
        <h3>🍏 آيفون (iPhone)</h3>
        <ol>
          <li>
            افتح اللينك من <b>Safari</b> (لازم Safari مش Chrome).
          </li>
          <li>
            دوس على زرار المشاركة <b>Share ⬆️</b> تحت.
          </li>
          <li>
            انزل واختار <b>Add to Home Screen</b> (إضافة إلى الشاشة الرئيسية).
          </li>
          <li>
            دوس <b>Add</b>، هتلاقي أيقونة IS Study على الشاشة.
          </li>
        </ol>
      </div>
      <div className={`card ${!ios ? 'highlight' : ''}`}>
        <h3>🤖 أندرويد (Android)</h3>
        <ol>
          <li>
            افتح اللينك من <b>Chrome</b>.
          </li>
          <li>
            هيظهرلك "Install app" تحت، أو دوس على <b>⋮</b> فوق واختار <b>Install app</b> / <b>Add to Home screen</b>.
          </li>
          <li>دوس Install، والأبلكيشن هيظهر مع باقي الأبلكيشنز.</li>
        </ol>
      </div>
      <div className="callout callout-note">
        <div className="callout-title">📝 ملاحظة</div>
        <p>بعد أول فتح، الشروحات والاختبارات بتشتغل من غير نت. المحاضرة الأصلية (PDF) بس هي اللي محتاجة نت لأنها بتتفتح من Drive.</p>
      </div>
    </Page>
  );
}
