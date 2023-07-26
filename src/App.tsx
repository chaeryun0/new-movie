import { Route, Routes } from 'react-router-dom';
import { Layout } from './page/Layout/Layout';
import Search from './page/Search/Search';
import Favorite from './page/Favorite/Favorite';
import NotFound from './page/NotFound/NotFound';
import { NO_RESULTS } from './assets/texts';
import styles from './App.module.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={
          <section>
            <p className={styles.noResults}>{NO_RESULTS}</p>
          </section>}
        />
        <Route path='/search' element={<Search />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App