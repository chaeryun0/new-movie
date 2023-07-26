import { useState } from 'react';
import { Movie } from '../../types/movie'
import styles from './MovieCard.module.css'
import Modal from '../Modal/Modal';

interface MovieCardProps {
  movie: Movie
}

const IMG_URL = import.meta.env.VITE_IMG_BASE_URL;

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const imgSrc = movie.poster_path || movie.backdrop_path;

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <li className={styles.movieCard} onClick={handleOpenModal}>
        <img
          className={styles.movieImg}
          alt={`Movie Image: ${movie.title}`}
          src={`${IMG_URL}${imgSrc}`}
        />
        <div className={styles.movieInfo}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.average}>{`★ ${movie.vote_average.toFixed(1)}`}</p>
          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </li>
      {isOpenModal && (
        <Modal
          onCloseModal={handleCloseModal}
          movie={movie}
        />
      )}
    </>
  )
}

export default MovieCard