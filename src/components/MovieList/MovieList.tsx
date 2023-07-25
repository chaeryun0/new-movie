import MovieCard from '../MovieCard/MovieCard'
import { Movie } from '../../types/movie'
import { NO_MOVIE } from '../../assets/texts'
import styles from './MovieLIst.module.css'

interface Props {
  movieData?: Movie[]
  isLoading?: boolean
}

const MovieList = ({ movieData, isLoading }: Props) => {
  return (
    <ul className={styles.movieCardList}>
      {!isLoading && movieData?.length ?
        (movieData.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />
        )) : (
          <p className={styles.noMovie}>{NO_MOVIE}</p>
        )}
    </ul>
  )
}

export default MovieList