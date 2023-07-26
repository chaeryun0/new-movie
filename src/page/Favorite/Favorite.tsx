import { useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types/movie';
import styles from './Favorite.module.css';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  return (
    <section className={styles.favoriteList}>
      <ul className={styles.favorites}>
        {favoriteMovies?.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </ul>
    </section>
  );
};

export default Favorite;