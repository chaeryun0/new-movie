import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieLIst.module.css'

const MovieList = () => {
  return (
    <div className={styles.listContainer}>
      <ul>
        <MovieCard />
      </ul>
    </div>
  )
}

export default MovieList
