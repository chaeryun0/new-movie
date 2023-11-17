import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { AxiosRequestConfig } from "axios";
import { getEndpoint, axiosInstance } from "api/movie";
import { RootState } from "redux/store";
import { setFetchingNextPage, setSearchResults, updateSearchQuery } from "../../redux/search/searchAction";
import MovieList from "components/MovieList/MovieList";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./Search.module.css";

interface MovieAPIResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const MIN_AVERAGE = 7;

const Search = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const dispatch = useDispatch();
  const { searchResults, searchQuery, currentPage, isFetchingNextPage } = useSelector((state: RootState) => state.search);

  const fetchFilteredData = (data: MovieAPIResponse): Movie[] => {
    const filteredData = data.results.filter((movie) => (movie.backdrop_path || movie.poster_path) !== null && movie.vote_average > MIN_AVERAGE);
    const sortedData = filteredData.sort((a, b) => b.vote_average - a.vote_average);
    return sortedData;
  };

  const fetchNextPage = async (page: number) => {
    try {
      dispatch(setFetchingNextPage(true));

      const url = getEndpoint(location.pathname);
      const params: AxiosRequestConfig = url === "/search/movie" ? { params: { query, page } } : {};
      const response = await axiosInstance.get<MovieAPIResponse>(url, params);
      const nextPageData = fetchFilteredData(response.data);

      // 리덕스에 검색 결과 업데이트
      dispatch(setSearchResults(nextPageData));
      console.log(`page ${page} :`, nextPageData);
    } catch (error) {
      console.error("fetchNextPage Error:", error);
    } finally {
      dispatch(setFetchingNextPage(false));
    }
  };

  useEffect(() => {
    dispatch(setSearchResults([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateSearchQuery(query));
  }, [dispatch, query]);

  useEffect(() => {
    // 검색어가 변경되면 리덕스에 업데이트
    if (query !== searchQuery) {
      dispatch(updateSearchQuery(query));
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isFetchingNextPage) {
        fetchNextPage(currentPage);
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
  }, [isFetchingNextPage, currentPage, dispatch, query, searchQuery]);

  return (
    <section className={styles.searchResults}>
      {searchResults.length ? <MovieList movieData={searchResults} /> : <p className={styles.noMovie}>{Msg.NO_MOVIE}</p>}
      <div ref={targetRef} style={{ height: "10px", backgroundColor: "red" }}></div>
    </section>
  );
};

export default Search;
