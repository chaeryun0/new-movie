import { useEffect, useState } from 'react'
import { axiosInstance, movieCategory } from '../../api/movie'
import MovieList from '../../components/MovieList/MovieList'
import styles from './Search.module.css'
import { Movie } from '../../types/movie'

interface MovieAPIResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showMovie, setShowMovie] = useState<Movie[]>([])

  const fetchMovieData = async () => {
    setIsLoading(true);

    try {
        const response = await axiosInstance.get<MovieAPIResponse>(movieCategory);
        const data = response.data;
        console.log('data :', data);

        setShowMovie(data.results);
        } catch (error) {
        console.error('fetchMovieData Error :', error);
      }
      setIsLoading(false);
    };

  useEffect(() => {
    fetchMovieData();
  }, []);
  

  return (
    <section className={styles.searchResults}>
      <MovieList 
        isLoading={isLoading}
        movieData={showMovie}
        />
    </section>
  )
}

export default Search