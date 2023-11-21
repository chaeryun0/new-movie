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
      // console.log("setSearchResults", action.payload);
      const { page, results } = action.payload;
      state.searchResults = { ...state.searchResults, [page]: results };
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      // console.log("updateSearchQuery", action.payload);
      state.searchQuery = action.payload;
      state.searchResults = {};
    },
  },
});

export const { setSearchResults, updateSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
