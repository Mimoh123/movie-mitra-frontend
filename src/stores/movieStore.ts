import { create } from "zustand";
import type { TMDBMovie } from "@/types";
import { SyncStatus } from "@/types";
import { getAllMovies } from "@/utils/API";


interface MovieState {
 movies: TMDBMovie[],
 status: SyncStatus,

 fetchMovies: () => Promise<void>,
}

const initialState = {
 movies: [],
 status: SyncStatus.LOCAL,
}

export const useMovieStore = create<MovieState>((set) => ({
 ...initialState,
 fetchMovies: async () => {
  set({ status: SyncStatus.LOADING });
  try {
   let movies: TMDBMovie[] = [];
   for (let i = 5; i <= 15; i++) {
    const response = await getAllMovies(i);
    movies = [...(movies ?? []), ...response.results];
   }
   const uniqueMoviesMap = new Map<number, TMDBMovie>();
   movies.forEach(movie => {
    if (!uniqueMoviesMap.has(movie.id)) {
     uniqueMoviesMap.set(movie.id, movie);
    }
   });
   const uniqueMovies = Array.from(uniqueMoviesMap.values());
   set({ movies: uniqueMovies, status: SyncStatus.SYNCED });
  } catch (error) {
   set({ status: SyncStatus.FAILED });
   throw error;
  }
 }
}))