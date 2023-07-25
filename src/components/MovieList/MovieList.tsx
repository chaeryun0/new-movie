import { useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { Movie } from '../../types/movie'
import styles from './MovieLIst.module.css'

const MovieList = () => {
  const [ movies ] = useState<Movie[]>([])

  return (
    <ul className={styles.movieCardList}>
      {movies.map((movie) =>
        <MovieCard key={movie.id} movie={movie} />
      )}
    </ul>
  )
}

export default MovieList