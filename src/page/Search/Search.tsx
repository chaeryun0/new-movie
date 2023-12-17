import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { getEndpoint, axiosInstance } from "api/movie";
import { RootState } from "redux/store";
import { setSearchResults, updateSearchQuery } from "../../redux/search/searchSlice";
import MovieList from "components/MovieList/MovieList";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./Search.module.css";

interface MovieAPIResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const MIN_AVERAGE = 7;

const Search = () => {
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const dispatch = useDispatch();
  const { searchResults, searchQuery } = useSelector((state: RootState) => state.search);

  const fetchFilteredData = (data: MovieAPIResponse): Movie[] => {
    const filteredData = data.results.filter((movie) => (movie.backdrop_path || movie.poster_path) !== null && movie.vote_average > MIN_AVERAGE);
    const sortedData = filteredData.sort((a, b) => b.vote_average - a.vote_average);
    return sortedData;
  };

  const fetchNextPage = async () => {
    try {
      setIsFetchingNextPage(true);

      const url = getEndpoint(location.pathname);
      const params: AxiosRequestConfig = url === "/search/movie" ? { params: { query, page: currentPage } } : {};
      const response = await axiosInstance.get<MovieAPIResponse>(url, params);
      const nextPageData = fetchFilteredData(response.data);

      dispatch(setSearchResults({ page: currentPage, results: nextPageData }));
      setCurrentPage((prevPage) => prevPage + 1);
      // console.log(`page ${currentPage} :`, nextPageData);
    } catch (error) {
      console.error("fetchNextPage Error:", error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    dispatch(setSearchResults({ page: 1, results: [] }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateSearchQuery(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (query !== searchQuery) {
      dispatch(updateSearchQuery(query));
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(callback, { threshold: 0 });

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isFetchingNextPage, dispatch, query, searchQuery]);

  return (
    <section className={styles.searchResults}>
      {Object.values(searchResults).flat().length ? <MovieList movieData={Object.values(searchResults).flat()} /> : <p className={styles.noMovie}>{Msg.NO_MOVIE}</p>}
      <div ref={targetRef}></div>
    </section>
  );
};

export default Search;
