import axios from "axios";
import { axiosInstance, pythonAxiosInstance } from "./axiosInstance";
import type { TMDBMovie } from "@/types";


const apikey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const registerApi = async (name: string, email: string, password: string) => {
 try {
  const response = await axios.post(`${baseUrl}/register`, { name, email, password })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to register user")
 }
}
export const loginApi = async (email: string, password: string) => {
 try {
  const response = await axios.post(`${baseUrl}/login`, { email, password })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to login user")
 }
}

export const forgotPasswordApi = async (email: string) => {
 try {
  const response = await axios.post(`${baseUrl}/forgot-password`, { email })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to send password reset email")
 }
}

export const resetPasswordApi = async (token: string, password: string) => {
 try {
  const response = await axios.post(`${baseUrl}/reset-password`, { token, password })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to reset password")
 }
}

export const changePasswordApi = async (currentPassword: string, newPassword: string) => {
 try {
  const response = await axiosInstance.post(`/change-password`, { currentPassword, newPassword })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to change password")
 }
}

export const getAllMovies = async (page: number = 1) => {
 try {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&page=${page}`)
  return response.data
 }
 catch (err) {
  throw err
 }
}

export const getMovieById = async (movieId: number | string): Promise<TMDBMovie> => {
 try {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=en-US`)
  const data = response.data;

  // Transform TMDB API response to match TMDBMovie type
  // TMDB API returns genres as objects, but we need genre_ids array
  const genreIds = data.genres ? data.genres.map((genre: { id: number; name: string }) => genre.id) : [];

  return {
   id: data.id,
   movie_id: data.id,
   adult: data.adult || false,
   backdrop_path: data.backdrop_path,
   genre_ids: genreIds,
   original_language: data.original_language || 'en',
   original_title: data.original_title || '',
   overview: data.overview || null,
   popularity: data.popularity || 0,
   poster_path: data.poster_path,
   release_date: data.release_date || null,
   title: data.title || 'Unknown',
   video: data.video || false,
   vote_average: data.vote_average || 0,
   vote_count: data.vote_count || 0,
   isFavourite: undefined,
  };
 }
 catch (err) {
  throw err
 }
}

export const getUserData = async () => {
 try {
  const response = await axiosInstance.get(`/user`)
  return response.data
 }
 catch (err) {
  throw err
 }
}

export const updateUserApi = async (userData: { name?: string; email?: string }) => {
 try {
  const response = await axiosInstance.put(`/user`, userData)
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to update user")
 }
}


export const createWatchListApi = async (watchList: TMDBMovie) => {
 try {
  const response = await axiosInstance.post(`/watchlist`, watchList)
  return response.data
 }
 catch (err) {
  throw err
 }
}


export const getWatchListsApi = async () => {
 try {
  const response = await axiosInstance.get(`/watchlist/user/get`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


export const deleteWatchListApi = async (id: string) => {
 try {
  const response = await axiosInstance.delete(`/watchlist/${id}`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


export const getMovieInMatrixApi = async () => {
 try {
  const response = await pythonAxiosInstance.get(`/movies`)
  return response.data
 }
 catch (err) {
  throw err
 }
}

export const getDropdownMoviesApi = async () => {
 try {
  const response = await pythonAxiosInstance.get(`/movies/dropdown`)
  return response.data
 }
 catch (err) {
  throw err
 }
}

export const getRecommendationsApi = async (movieId?: number, movieTitle?: string) => {
 try {
  const params: Record<string, string> = {};
  if (movieId) {
   params.movie_id = movieId.toString();
  }
  if (movieTitle) {
   params.movie_title = movieTitle;
  }
  const response = await pythonAxiosInstance.get(`/recommend`, { params })
  return response.data
 }
 catch (err) {
  throw err
 }
}