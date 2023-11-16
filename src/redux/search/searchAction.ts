import { Movie } from "types/movie";

export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
export const SET_FETCHING_NEXT_PAGE = "SET_FETCHING_NEXT_PAGE";

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  payload: Movie[]; // 검색 결과로 받아올 영화 배열
}

interface UpdateSearchQueryAction {
  type: typeof UPDATE_SEARCH_QUERY;
  payload: string; // 업데이트된 검색 쿼리
}

interface SetFetchingNextPageAction {
  type: typeof SET_FETCHING_NEXT_PAGE;
  payload: boolean;
}

export type SearchActionTypes = SetSearchResultsAction | UpdateSearchQueryAction | SetFetchingNextPageAction;

// 새 검색 결과 가져올 때
export const setSearchResults = (results: Movie[]): SetSearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

// 검색어가 업데이트 될 때
export const updateSearchQuery = (query: string): UpdateSearchQueryAction => ({
  type: UPDATE_SEARCH_QUERY,
  payload: query,
});

// 현재 검색 결과에서 다음 페이지를 가져오고 있는지
export const setFetchingNextPage = (isFetching: boolean): SetFetchingNextPageAction => ({
  type: SET_FETCHING_NEXT_PAGE,
  payload: isFetching,
});
