import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Page, Tabs } from '../components/Layout.jsx';
import { getCourse, has, driveUrl } from '../lib/content.js';
import { useStore, unitKey } from '../lib/store.js';

export default function Course() {
  const { courseId } = useParams();
  const c = getCourse(courseId);
  const s = useStore();
  const [params, setParams] = useSearchParams();
  const kind = params.get('k') || 'lecture';
  if (!c) return <Page title="مش لاقي المادة" />;

  const units = c.units.filter((u) => u.kind === kind);
  const hasSections = c.units.some((u) => u.kind === 'section');

  return (
    <Page title={c.title} subtitle={c.titleAr}>
      <div className="row wrap gap">
        <Link className="btn primary" to={`/review/${c.id}`}>
          🎯 مراجعة ميد / فاينال
        </Link>
        <Link className="btn" to={`/cards/${c.id}`}>
          🃏 كروت المادة
        </Link>
        {c.practice && (
          <Link className="btn" to={`/practice/${c.id}`}>
            🧮 تدريب تفاعلي
          </Link>
        )}
        {c.drive && (
          <a className="btn" href={`https://drive.google.com/drive/folders/${c.drive}`} target="_blank" rel="noreferrer">
            📂 فولدر المادة
          </a>
        )}
      </div>
      {hasSections && (
        <Tabs
          tabs={[
            ['lecture', '📖 المحاضرات'],
            ['section', '🧑‍🏫 السكاشن'],
          ]}
          value={kind}
          onChange={(k) => setParams({ k }, { replace: true })}
        />
      )}
      <div className="unit-list">
        {units.map((u) => {
          const key = unitKey(c.id, u.id);
          const ready = has('lesson', c.id, u.id);
          const best = s.quiz[key]?.best;
          const body = (
            <>
              <span className="unit-n">{u.n}</span>
              <span className="unit-info">
                <b dir="ltr">{u.title}</b>
                {u.titleAr && <small>{u.titleAr}</small>}
              </span>
              <span className="unit-badges">
                {s.read[key] && <span title="قريتها">✅</span>}
                {best != null && <span className={`score ${best >= 85 ? 'great' : best >= 60 ? 'ok' : 'bad'}`}>{best}%</span>}
                {u.mid && <span className="chip small">ميد</span>}
              </span>
            </>
          );
          return ready ? (
            <Link key={u.id} className="unit" to={`/c/${c.id}/${u.id}`}>
              {body}
            </Link>
          ) : (
            <div key={u.id} className="unit disabled">
              {body}
              {u.pdf && (
                <a className="chip" href={driveUrl(u.pdf, 'view')} target="_blank" rel="noreferrer">
                  📄 PDF
                </a>
              )}
              <small className="soon">⏳ قريب</small>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
