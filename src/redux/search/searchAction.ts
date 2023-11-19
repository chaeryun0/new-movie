import { Movie } from "types/movie";

export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  payload: { page: number; results: Movie[] };
}

interface UpdateSearchQueryAction {
  type: typeof UPDATE_SEARCH_QUERY;
  payload: string;
}

export type SearchActionTypes = SetSearchResultsAction | UpdateSearchQueryAction;

export const setSearchResults = (page: number, results: Movie[]): SetSearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  payload: { page, results },
});

export const updateSearchQuery = (query: string): UpdateSearchQueryAction => ({
  type: UPDATE_SEARCH_QUERY,
  payload: query,
});
