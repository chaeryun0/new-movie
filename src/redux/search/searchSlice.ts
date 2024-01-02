import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "types/movie";

interface SearchState {
  searchResults: { [page: number]: Movie[] };
  searchQuery: string;
}

const initialState: SearchState = {
  searchResults: {},
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<{ page: number; results: Movie[] }>) => {
      const { page, results } = action.payload;
      state.searchResults = { ...state.searchResults, [page]: results };
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.searchResults = {};
    },
  },
});

export const { setSearchResults, updateSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
