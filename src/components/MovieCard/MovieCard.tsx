import { useState } from "react";
import Modal from "components/Modal/Modal";
import { addFavoriteMovie } from "storage/movie";
import { Movie } from "types/movie";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
}

const IMG_URL = import.meta.env.VITE_IMG_BASE_URL;

const MovieCard = ({ movie, isFavorite, removeFromFavorites }: MovieCardProps) => {
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
        <img className={styles.movieImg} alt={`Movie Image: ${movie.title}`} src={`${IMG_URL}${imgSrc}`} />
        <div className={styles.movieInfo}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.average}>{`★ ${movie.vote_average.toFixed(1)}`}</p>
          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </li>
      {isOpenModal && <Modal movie={movie} isFavorite={isFavorite} onCloseModal={handleCloseModal} addToFavorites={addFavoriteMovie} removeFromFavorites={removeFromFavorites} />}
    </>
  );
};

export default MovieCard;
