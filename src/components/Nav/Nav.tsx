import { BsSearch } from 'react-icons/bs'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navBar}>
        <a className={styles.navLink}>
          <BsSearch className={styles.homeIcon} />
        </a>
        <a className={styles.navLink}>
          <BsBookmarkHeartFill className={styles.favoriteIcon} />
        </a>
      </div>
    </nav>
  )
}

export default Nav
