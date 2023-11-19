import { applyMiddleware, combineReducers, createStore } from "redux";
import favoriteMoviesReducer from "./favorite/favoriteMoviesReducer";
import searchReducer from "./search/searchReducer";
import logger from "redux-logger";

const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
  search: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;

export type RootState = ReturnType<typeof store.getState>;
