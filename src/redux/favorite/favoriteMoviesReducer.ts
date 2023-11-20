import { ADD_TO_FAVORITES, FavoriteMoviesActionTypes, REMOVE_FROM_FAVORITES, SET_FAVORITE_MOVIES } from "./favoriteMoviesAction";
import { Movie } from "types/movie";

interface FavoriteMoviesState {
  movies: Movie[];
}

const initialState: FavoriteMoviesState = {
  movies: [],
};

const favoriteMoviesReducer = (state = initialState, action: FavoriteMoviesActionTypes): FavoriteMoviesState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    case SET_FAVORITE_MOVIES:
      return {
        movies: action.payload,
      };

    default:
      return state;
  }
};

export default favoriteMoviesReducer;
