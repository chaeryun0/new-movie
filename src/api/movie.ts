import axios from 'axios';

const MOVIE_URL = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: MOVIE_URL,
  params: {
    api_key: API_KEY, 
    language: 'ko-KR',
    include_adult: false,
  },
});

export const getEndpoint = (pathname: string): string => {
  return pathname.startsWith('/search') ? '/search/movie' : '/movie/popular';
};