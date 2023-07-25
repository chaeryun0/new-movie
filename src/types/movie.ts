export interface Movie {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
}

export interface MovieAPIRes {
  Search: Movie[],
  total_pages: string,
  total_results: string
}