import { Movie } from "types/movie";

const key = "favoriteMovies";

export const getFavoriteMovies = (): Movie[] => {
  const storedFavorites = localStorage.getItem(key);
  try {
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Error parsing favorite movies from localStorage:", error);
    return [];
  }
};

export const addFavoriteMovie = (movie: Movie) => {
  const arr = getFavoriteMovies();
  const isAlreadyFavorite = arr.some((favMovie) => favMovie.id === movie.id);
  if (!isAlreadyFavorite) {
    arr.push(movie);
    localStorage.setItem(key, JSON.stringify(arr));
  }
};

export const removeFavoriteMovies = () => {
  localStorage.removeItem(key);
};

export const setFavoriteMoviesInLocal = (movies: Movie[]) => {
  const str = JSON.stringify(movies);
  localStorage.setItem(key, str);
};
