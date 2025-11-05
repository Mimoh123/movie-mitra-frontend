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
   const response = await getAllMovies();
   set({ movies: response.results, status: SyncStatus.SYNCED });
  } catch (error) {
   set({ status: SyncStatus.FAILED });
   throw error;
  }
 }
}))