import { BsSearch } from 'react-icons/bs'
import styles from './SearchInput.module.css'

const SearchInput = () => {
  return (
    <header className={styles.searchHeader}>
      <form className={styles.searchForm}>
        <BsSearch className={styles.searchIcon} />
        <input
          type='search' 
          placeholder='영화 제목을 입력해주세요.'
          className={styles.searchInput} />
      </form>
    </header>
  )
}

export default SearchInput