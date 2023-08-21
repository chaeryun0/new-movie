import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { AxiosRequestConfig } from 'axios';
import { axiosInstance, getEndpoint } from '../../api/movie';
import { Movie } from '../../types/movie';
import styles from './Search.module.css';

interface MovieAPIResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const MIN_AVERAGE = 7;

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Movie[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchFilteredData = (data: MovieAPIResponse): Movie[] => {
    const filteredData = data.results.filter(
      (movie) => (movie.backdrop_path || movie.poster_path) !== null && movie.vote_average > MIN_AVERAGE
    );
    const sortedData = filteredData.sort((a, b) => b.vote_average - a.vote_average);
    return sortedData;
  };

  const fetchNextPage = async (page: number) => {
    try {
      setIsFetchingNextPage(true);

      const url = getEndpoint(location.pathname);
      const params: AxiosRequestConfig = url === '/search/movie' ? { params: { query, page } } : {};
      const response = await axiosInstance.get<MovieAPIResponse>(url, params);
      const nextPageData = fetchFilteredData(response.data);

      console.log(`page ${page} :`, nextPageData);
      setSearchResult((prevResults) => [...prevResults, ...nextPageData]);
      setCurrentPage(page + 1);

    } catch (error) {
      console.error('fetchNextPage Error:', error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };
  
  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // console.log('target:', target)
      // console.log('observer:', observer)

      if (target.isIntersecting && !isFetchingNextPage) {
        fetchNextPage(currentPage);
      }
    };
  
  observer.current = new IntersectionObserver(callback, { threshold: 1 });

  if (targetRef.current) {
    observer.current.observe(targetRef.current);
  }


    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isFetchingNextPage, currentPage]);

  return (
    <section className={styles.searchResults}>
      <MovieList isLoading={isLoading} movieData={searchResult} />
      <div ref={targetRef} style={{ height: '10px', backgroundColor: 'red' }}></div>
    </section>
  );
};

export default Search;