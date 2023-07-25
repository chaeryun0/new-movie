import { Route, Routes } from 'react-router-dom';
import { Layout } from './page/Layout/Layout';
import Search from './page/Search/Search';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/search' element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App