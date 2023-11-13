import { Movie } from "types/movie";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const SET_FAVORITE_MOVIES = "SET_FAVORITE_MOVIES";
export const UPDATE_FAVORITE_MOVIES = "UPDATE_FAVORITE_MOVIES";

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: Movie;
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: Movie;
}

interface SetFavoriteMoviesAction {
  type: typeof SET_FAVORITE_MOVIES;
  payload: Movie[];
}

interface UpdateFavoriteMoviesAction {
  type: typeof UPDATE_FAVORITE_MOVIES;
  payload: Movie[];
}

export const addToFavoritesRedux = (movie: Movie): AddToFavoritesAction => ({
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const removeFromFavoritesRedux = (movie: Movie): RemoveFromFavoritesAction => ({
  type: REMOVE_FROM_FAVORITES,
  payload: movie,
});

// 영화의 전체 목록 설정
export const setAllFavoriteMovies = (movies: Movie[]): SetFavoriteMoviesAction => ({
  type: SET_FAVORITE_MOVIES,
  payload: movies,
});

// 좋아하는 영화 목록 업데이트
export const updateFavoriteMovies = (movies: Movie[]): UpdateFavoriteMoviesAction => ({
  type: UPDATE_FAVORITE_MOVIES,
  payload: movies,
});

export type FavoriteMoviesActionTypes = AddToFavoritesAction | RemoveFromFavoritesAction | UpdateFavoriteMoviesAction | SetFavoriteMoviesAction;
