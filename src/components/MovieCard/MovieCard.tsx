import styles from './MovieCard.module.css'

const MovieCard = () => {
  return (
    <div className={styles.movieCardWrap}>
      <li className={styles.movieCard}>
        <img
          className={styles.cardImg}
          alt='영화 포스터'
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.title}>영화 제목</h3>
          <p className={styles.overview}>영화 설명</p>
        </div>
      </li>
    </div>
  
  
  )
}

export default MovieCard
