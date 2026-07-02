import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails, getPosterUrl } from '../../services/tmdbApi.js';
import css from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return isActive ? `${css.link} ${css.active}` : css.link;
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  if (!movie) {
    return null;
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
  const userScore = Math.round(movie.vote_average * 10);
  const genres = movie.genres.map(genre => genre.name).join(' ');

  return (
    <div>
      <Link className={css.backLink} to={backLinkRef.current}>
        ← Go back
      </Link>
      <div className={css.movieCard}>
        {posterUrl && <img className={css.poster} src={posterUrl} alt={movie.title} />}
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} ({releaseYear})
          </h1>
          <p>User Score: {userScore}%</p>
          <h2 className={css.subtitle}>Overview</h2>
          <p>{movie.overview || 'No overview available.'}</p>
          <h2 className={css.subtitle}>Genres</h2>
          <p>{genres || 'No genres available.'}</p>
        </div>
      </div>
      <div className={css.additional}>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
