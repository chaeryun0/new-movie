import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updateFavoriteMovies } from "../../redux/favorite/favoriteMoviesSlice";
import { getFavoriteMovies, setFavoriteMoviesInLocal } from "storage/movie";
import MovieCard from "components/MovieCard/MovieCard";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./Favorite.module.css";

const Favorite = () => {
  const reduxFavoriteMovies = useSelector((state: RootState) => state.favoriteMovies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavorites = getFavoriteMovies();
    dispatch(updateFavoriteMovies(storedFavorites));
  }, [dispatch]);

  const addToFavorites = (movie: Movie) => {
    setFavoriteMoviesInLocal([...reduxFavoriteMovies, movie]);
    dispatch(updateFavoriteMovies([...reduxFavoriteMovies, movie]));
  };

  const removeFromFavorites = (movie: Movie) => {
    setFavoriteMoviesInLocal(reduxFavoriteMovies.filter((favMovie) => favMovie.id !== movie.id));
    dispatch(updateFavoriteMovies(reduxFavoriteMovies.filter((favMovie) => favMovie.id !== movie.id)));
  };

  const latestAddFavoritedMovies = reduxFavoriteMovies.slice().reverse();

  if (latestAddFavoritedMovies.length === 0) {
    return (
      <section className={styles.favoriteList}>
        <p className={styles.noFavorite}>{Msg.NO_FAVORITE}</p>
      </section>
    );
  }

  return (
    <section className={styles.favoriteList}>
      <ul className={styles.favorites}>
        {latestAddFavoritedMovies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} isFavorite={true} />
        ))}
      </ul>
    </section>
  );
};

export default Favorite;
