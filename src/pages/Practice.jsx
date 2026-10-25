import { useParams } from 'react-router-dom';
import { Page } from '../components/Layout.jsx';
import { getCourse } from '../lib/content.js';

// Interactive solvers (Simplex, Transportation, Assignment) are added with the OR content.
export default function Practice() {
  const c = getCourse(useParams().courseId);
  return (
    <Page title="🧮 تدريب تفاعلي" subtitle={c?.title}>
      <p className="muted">التدريب التفاعلي هيتضاف مع شرح المادة.</p>
    </Page>
  );
}
