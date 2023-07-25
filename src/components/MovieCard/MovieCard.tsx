import { Movie } from '../../types/movie'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
}

const IMG_URL = import.meta.env.VITE_IMG_BASE_URL;

const MovieCard = ({ movie }: MovieCardProps) => {
  const imgSrc = movie.poster_path || movie.backdrop_path;

  return (
    <li className={styles.movieCard}>
      <img
        className={styles.movieImg}
        alt={`Movie Image: ${movie.title}`}
        src={`${IMG_URL}${imgSrc}`}
      />
      <div className={styles.movieInfo}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </li>
  )
}

export default MovieCard