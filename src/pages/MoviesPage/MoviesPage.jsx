import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { searchMovies } from '../../services/tmdbApi.js';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') ?? '';

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.elements.query.value.trim();

    if (!value) {
      setSearchParams({});
      setMovies([]);
      return;
    }

    setSearchParams({ query: value });
    form.reset();
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError(true);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
