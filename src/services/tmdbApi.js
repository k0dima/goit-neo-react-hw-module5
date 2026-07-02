import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    language: 'en-US',
  },
});

api.interceptors.request.use(config => {
  if (!API_TOKEN) {
    throw new Error('TMDB access token is missing. Add VITE_TMDB_TOKEN to the .env file.');
  }

  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  return config;
});

export const getPosterUrl = path => {
  if (!path) {
    return null;
  }

  return `${IMAGE_BASE_URL}${path}`;
};

export const fetchTrendingMovies = async () => {
  const { data } = await api.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await api.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      page: 1,
    },
  });

  return data.results;
};

export const fetchMovieDetails = async movieId => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async movieId => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async movieId => {
  const { data } = await api.get(`/movie/${movieId}/reviews`);
  return data.results;
};
