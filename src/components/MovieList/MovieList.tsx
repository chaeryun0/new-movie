import MovieCard from '../MovieCard/MovieCard'
import { Movie } from '../../types/movie'
import { NO_FAVORITE, NO_RESULTS } from '../../assets/texts'
import styles from './MovieLIst.module.css'

interface Props {
  movieData?: Movie[]
}

const MovieList = ({ movieData }: Props) => {
  return (
    <ul className={styles.movieCardList}>
      {movieData?.length ? 
        movieData.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />
        ) : (
        <p className={styles.locationPathText}>
          {location.pathname === '/' ? NO_RESULTS : NO_FAVORITE}
        </p>
      )}
    </ul>
  )
}

export default MovieList