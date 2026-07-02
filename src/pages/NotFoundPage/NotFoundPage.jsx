import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>Page not found</h1>
      <Link to="/">Go to home page</Link>
    </div>
  );
}
