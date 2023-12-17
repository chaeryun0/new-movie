import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import favoriteMoviesSlice from "./favorite/favoriteMoviesSlice";
import searchSlice from "./search/searchSlice";

const store = configureStore({
  reducer: {
    favoriteMovies: favoriteMoviesSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
