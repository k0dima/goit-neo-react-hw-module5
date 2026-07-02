import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { fetchTrendingMovies } from '../../services/tmdbApi.js';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
