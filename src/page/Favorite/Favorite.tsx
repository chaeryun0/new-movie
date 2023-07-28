import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types/movie';
import { Msg } from '../../assets/texts';
import styles from './Favorite.module.css';
import { useEffect, useState } from 'react';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);


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
            isFavorite={true}
          />
        ))}
      </ul>
    </section>
  );
};

export default Favorite;