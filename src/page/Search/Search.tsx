import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Movie[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const MIN_AVERAGE = 7;

  useEffect(() => {
    const fetchMovieData = async (searchQuery: string) => {
      try {
        setIsLoading(true);
        const url = getEndpoint(location.pathname);
        const params: AxiosRequestConfig = url === '/search/movie' ? { params: { query: searchQuery } } : {};

        const response = await axiosInstance.get<MovieAPIResponse>(url, params);
        const filteredImg = response.data.results.filter((movie) => movie.backdrop_path || movie.poster_path !== null)
        const filteredAverage = filteredImg.filter((movie) => movie.vote_average > MIN_AVERAGE);
        const sortedData = filteredAverage.sort((a, b) => b.vote_average - a.vote_average);
        setSearchResult(sortedData);
      } catch (error) {
        console.error('fetchMovieData Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchMovieData(query);
    }
  }, [query, location.pathname]);

  return (
    <section className={styles.searchResults}>
      <MovieList isLoading={isLoading} movieData={searchResult} />
    </section>
  );
};

export default Search;