import SearchInput from './components/SearchInput/SearchInput'
import Search from './page/Search/Search'
import Nav from './components/Nav/Nav'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.app}>
        <SearchInput />
        <Search />
        <Nav />
      </main>
    </div>
  )
}

export default App