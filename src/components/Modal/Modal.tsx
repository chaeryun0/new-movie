import { GrClose } from "react-icons/gr";
import { addFavoriteMovie } from "storage/movie";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./Modal.module.css";

interface ModalProps {
  movie: Movie;
  isFavorite: boolean;
  onCloseModal: () => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
}

const Modal = ({ movie, isFavorite, onCloseModal, removeFromFavorites }: ModalProps) => {
  const addOrRemoveText = (isFavorite: boolean) => {
    return isFavorite ? [Msg.IS_REMOVE_FAVORITE, Msg.REMOVE_BTN] : [Msg.IS_ADD_FAVORITE, Msg.ADD_BTN];
  };

  const [isAddOrRemove, AddOrRemoveBtn] = addOrRemoveText(isFavorite);

  const handleAddOrRemove = () => {
    if (isFavorite) {
      //  console.log("Removing from favorites:", movie.title);
      removeFromFavorites(movie);
    } else {
      // console.log("Adding to favorites:", movie.title);
      addFavoriteMovie(movie);
    }
    onCloseModal();
  };

  return (
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <section className={styles.modalContent}>
        <GrClose className={styles.close} onClick={onCloseModal} />
        <p>{isAddOrRemove}</p>
        <div className={styles.btnWrap}>
          <button type="button" onClick={handleAddOrRemove}>
            {AddOrRemoveBtn}
          </button>
          <button type="button" onClick={onCloseModal}>
            {Msg.CNL_BTN}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
