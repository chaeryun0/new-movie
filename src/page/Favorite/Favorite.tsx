import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updateFavoriteMovies } from "../../redux/favorite/favoriteMoviesAction";
import { getFavoriteMovies, setFavoriteMoviesInLocal } from "storage/movie";
import MovieCard from "components/MovieCard/MovieCard";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./Favorite.module.css";

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  // 리덕스에서 즐겨찾기 목록을 가져오기
  const reduxFavoriteMovies = useSelector((state: RootState) => state.favoriteMovies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    // Redux에서 가져온 목록을 로컬 스토리지에 반영
    setFavoriteMovies(reduxFavoriteMovies);
  }, [reduxFavoriteMovies]);

  // 로컬 스토리지에서 즐겨찾기 목록을 가져오기
  const loadFavoriteMovies = () => {
    const storedFavorites = getFavoriteMovies();
    setFavoriteMovies(storedFavorites);
  };

  useEffect(() => {
    // 컴포넌트가 로드될 때 로컬 스토리지에서 즐겨찾기 목록을 불러옴
    loadFavoriteMovies();
  }, []);

  const addToFavorites = (movie: Movie) => {
    // 변경된 즐겨찾기 목록을 로컬스토리지에 저장
    setFavoriteMoviesInLocal([...favoriteMovies, movie]);
    console.log("addToFavorites:", movie.title);
  };

  const removeFromFavorites = (movie: Movie) => {
    setFavoriteMovies((prevFavoriteMovies) => {
      const updatedFavorites = prevFavoriteMovies.filter((favMovie) => favMovie.id !== movie.id);
      setFavoriteMoviesInLocal(updatedFavorites);
      console.log("removeFromFavorites:", movie.title);
      return updatedFavorites;
    });
  };

  useEffect(() => {
    // Redux에 변경된 목록을 저장
    dispatch(updateFavoriteMovies(favoriteMovies));
  }, [favoriteMovies, dispatch]);

  const latestAddFavoritedMovies = favoriteMovies.slice().reverse();

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
