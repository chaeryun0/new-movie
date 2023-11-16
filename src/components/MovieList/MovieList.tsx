import MovieCard from "components/MovieCard/MovieCard";
import { addFavoriteMovie } from "storage/movie";
import { Movie } from "types/movie";
import { Msg } from "assets/texts";
import styles from "./MovieList.module.css";

interface Props {
  movieData?: Movie[];
  removeFromFavorites?: (movie: Movie) => void;
}

const MovieList = ({ movieData, removeFromFavorites }: Props) => {
  return (
    <ul className={styles.movieCardList}>
      {movieData?.length ? (
        movieData.map((movie, index) => <MovieCard key={`${movie.id}-${index}`} movie={movie} isFavorite={false} addToFavorites={addFavoriteMovie} removeFromFavorites={() => removeFromFavorites} />)
      ) : (
        <p className={styles.noMovie}>{Msg.NO_MOVIE}</p>
      )}
    </ul>
  );
};

export default MovieList;
