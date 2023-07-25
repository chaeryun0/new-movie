import { Outlet } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';
import Nav from '../../components/Nav/Nav';
import styles from './Layout.module.css'

export const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.app}>
        <SearchInput />
        <Outlet />
        <Nav />
      </main>
    </div>
  );
};