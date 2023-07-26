import { GrClose } from 'react-icons/gr'
import { Movie } from '../../types/movie';
import { ADD_FAVORITE_BTN, CNL_FAVORITE_BTN, IS_ADD_FAVORITE } from '../../assets/texts';
import styles from './Modal.module.css';

interface ModalProps {
  onCloseModal: () => void;
  movie: Movie;
}

const Modal = ({ onCloseModal }: ModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <section className={styles.modalContent}>
        <GrClose className={styles.close} onClick={onCloseModal} />
        <p>{IS_ADD_FAVORITE}</p>
        <div className={styles.btnWrap}>
          <button type='button'>{ADD_FAVORITE_BTN}</button>
          <button type='button' onClick={onCloseModal}>
            {CNL_FAVORITE_BTN}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;