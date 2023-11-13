import { combineReducers, createStore } from "redux";
import favoriteMoviesReducer from "./favorite/favoriteMoviesReducer";
import searchReducer from "./search/searchReducer";

const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
  search: searchReducer,
});

const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;
