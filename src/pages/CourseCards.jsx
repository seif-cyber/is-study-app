import { useParams } from 'react-router-dom';
import { Page, Loading } from '../components/Layout.jsx';
import Flashcards from '../components/Flashcards.jsx';
import { useAsync } from './Unit.jsx';
import { getCourse, loadCards } from '../lib/content.js';
import { unitKey } from '../lib/store.js';

export default function CourseCards() {
  const { courseId } = useParams();
  const c = getCourse(courseId);
  const cards = useAsync(
    async () => (await Promise.all(c.units.map(async (u) => (await loadCards(c.id, u.id)).map((x, i) => ({ ...x, id: `${unitKey(c.id, u.id)}/${i}` }))))).flat(),
    [courseId],
  );
  return (
    <Page title="🃏 كروت المراجعة" subtitle={c.title}>
      {cards === undefined ? <Loading /> : <Flashcards cards={cards} />}
    </Page>
  );
}
