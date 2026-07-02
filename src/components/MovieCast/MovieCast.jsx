import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, getPosterUrl } from '../../services/tmdbApi.js';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  if (cast.length === 0) {
    return <p>We don't have any cast information for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(actor => {
        const photoUrl = getPosterUrl(actor.profile_path);

        return (
          <li key={actor.cast_id || actor.credit_id} className={css.item}>
            {photoUrl && <img className={css.photo} src={photoUrl} alt={actor.name} />}
            <p>{actor.name}</p>
            <p>Character: {actor.character || 'Unknown'}</p>
          </li>
        );
      })}
    </ul>
  );
}
