const API_KEY = "f8adccfaa69240c547950ad108d04849";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name?: string;
  title?: string;
  overview: string;
}

export interface IGetMoviesResult {
  results: IMovie[]; 
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export interface IGetTopRated {
  results: IMovie[];
}

export function getTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export interface IGetUpcoming {
  results: IMovie[];
}

export function getUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export interface IGetPopular {
  results: IMovie[];
}
export function getPopular() {
  return fetch(`
  https://api.themoviedb.org/3/movie/popular?api_key=f8adccfaa69240c547950ad108d04849&language=en-US&page=1`).then(
    (res) => res.json()
  );
}

interface IGenres {
  name: string;
  id: number;
} 

export interface IGetMoviesDetails {
  genres: IGenres[];
  runtime: string;
  vote_average: number;
}

export function getDetails(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}



interface ITV {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name?: string;
  title?: string;
  overview: string;
}

export interface IGetOnTheAirTV {
  results: ITV[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}
export function getOnTheAirTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=f8adccfaa69240c547950ad108d04849&language=en-US&page=1`
  ).then((res) => res.json());
}

export interface IGetTopRatedTV {
  results: ITV[];
}

export function getTopRatedTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=f8adccfaa69240c547950ad108d04849&language=en-US&page=1`
  ).then((res) => res.json());
}

// popular
export interface IGetPopularTV {
  results: ITV[];
}
export function getPopularTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=f8adccfaa69240c547950ad108d04849&language=en-US&page=1`
  ).then((res) => res.json());
}

interface IGenres {
  name: string;
  id: number;
} 

export interface IGetTvDetails {
  genres: IGenres[];
  runtime: string;
  vote_average: number;
}

export function getTvDetails(tvId: string) {
  return fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=f8adccfaa69240c547950ad108d04849&language=en-US`
  ).then((response) => response.json());
}


export const fetchSearchMovie = (keywords?: string|null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keywords}&page=1&include_adult=false`
  ).then((response) => response.json());
};

export const fetchSearchTv = (keywords?: string) => {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&query=${keywords}&page=1&include_adult=%08false`
  ).then((response) => response.json());
};