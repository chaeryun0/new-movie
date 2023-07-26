import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to='/' className={styles.navLink}>
          <BsSearch className={styles.homeIcon} />
        </Link>
        <Link to='/favorite' className={styles.navLink}>
          <BsBookmarkHeartFill className={styles.favoriteIcon} />
        </Link>
      </div>
    </nav>
  )
}

export default Nav