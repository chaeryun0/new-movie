import { Movie } from "types/movie";
import { SET_SEARCH_RESULTS, SearchActionTypes, UPDATE_SEARCH_QUERY } from "./searchAction";

interface SearchState {
  searchResults: { [page: number]: Movie[] };
  searchQuery: string;
}

const initialState: SearchState = {
  searchResults: {},
  searchQuery: "",
};

const searchReducer = (state = initialState, action: SearchActionTypes): SearchState => {
  switch (action.type) {
    case SET_SEARCH_RESULTS: {
      const { page, results } = action.payload;
      console.log("SET_SEARCH_RESULTS", action.payload);
      return {
        ...state,
        searchResults: { ...state.searchResults, [page]: results },
      };
    }

    case UPDATE_SEARCH_QUERY:
      console.log("UPDATE_SEARCH_QUERY", action.payload);
      return {
        ...state,
        searchQuery: action.payload,
        searchResults: {},
      };

    default:
      return state;
  }
};

export default searchReducer;
