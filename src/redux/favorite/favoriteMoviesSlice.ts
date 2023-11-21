import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "types/movie";

interface FavoriteState {
  movies: Movie[];
}

const initialState: FavoriteState = {
  movies: [],
};
const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.concat(action.payload);
    },
    removeFavoriteMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
    setAllFavoriteMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    updateFavoriteMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { addFavoriteMovie, removeFavoriteMovie, updateFavoriteMovies, setAllFavoriteMovies } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
