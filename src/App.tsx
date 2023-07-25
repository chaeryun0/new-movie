import SearchInput from './components/SearchInput/SearchInput'
import MovieList from './components/MovieList/MovieList'
import Nav from './components/Nav/Nav'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.app}>
        <SearchInput />
        <MovieList />
        <Nav />
      </main>
    </div>
  )
}

export default App