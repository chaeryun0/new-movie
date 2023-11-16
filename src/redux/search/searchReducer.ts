import { Movie } from "types/movie";
import { SET_FETCHING_NEXT_PAGE, SET_SEARCH_RESULTS, SearchActionTypes, UPDATE_SEARCH_QUERY } from "./searchAction";

interface SearchState {
  searchResults: Movie[];
  searchQuery: string;
  currentPage: number;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

const initialState: SearchState = {
  searchResults: [],
  searchQuery: "",
  currentPage: 1,
  isFetchingNextPage: false,
  isLoading: false,
};

const searchReducer = (state = initialState, action: SearchActionTypes): SearchState => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      console.log("SET_SEARCH_RESULTS", action.payload);
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.payload], // 검색 결과 업데이트
        currentPage: state.currentPage + 1, // 현재 페이지 업데이트
      };

    case UPDATE_SEARCH_QUERY:
      console.log("UPDATE_SEARCH_QUERY", action.payload);
      return {
        ...state,
        searchQuery: action.payload, // 검색 쿼리 업데이트
        searchResults: [], // 검색 쿼리 변경되면 검색 결과 초기화
        currentPage: 1, // 검색 쿼리 변경되면 페이지 초기화
      };

    case SET_FETCHING_NEXT_PAGE:
      console.log("SET_FETCHING_NEXT_PAGE", action.payload);
      return {
        ...state,
        isFetchingNextPage: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
