import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return isActive ? `${css.link} ${css.active}` : css.link;
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
