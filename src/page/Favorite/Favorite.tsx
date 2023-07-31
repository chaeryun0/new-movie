import { useState, useEffect } from 'react';
import { getFavoriteMovies, setFavoriteMoviesInLocal } from '../../storage/movie';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types/movie';
import { Msg } from '../../assets/texts';
import styles from './Favorite.module.css';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(getFavoriteMovies());

  useEffect(() => {
    setFavoriteMoviesInLocal(favoriteMovies);
  }, [favoriteMovies]);

    const addToFavorites = (movie: Movie) => {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
      console.log('addToFavorites:', movie.title);
  }; 

    const removeFromFavorites = (movie: Movie) => {
      setFavoriteMovies((prevFavorites) =>
        prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
      );
      console.log('removeFromFavorites:', movie.title);
  };

  const latestAddFavoreites = favoriteMovies.slice().reverse();

  if (latestAddFavoreites.length === 0) {
    return (
      <section className={styles.favoriteList}>
        <p className={styles.noFavorite}>{Msg.NO_FAVORITE}</p>
      </section>
    );
  }

  return (
    <section className={styles.favoriteList}>
      <ul className={styles.favorites}>
        {latestAddFavoreites.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={true}
          />
        ))}
      </ul>
    </section>
  );
};

export default Favorite;