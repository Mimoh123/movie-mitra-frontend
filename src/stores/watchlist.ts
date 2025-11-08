import { create } from "zustand";
import type { TMDBMovie } from "@/types";
import { SyncStatus } from "@/types";
import { getWatchListsApi } from "@/utils/API";
import { toast } from "sonner";


interface WatchListState {
 watchLists: TMDBMovie[],
 status: SyncStatus,
 loadingMovies: Set<number>,

 fetchWatchLists: () => Promise<void>,
 addWatchList: (movie: TMDBMovie) => Promise<void>,
 deleteWatchList: (id: number) => Promise<void>,
 setLoadingMovie: (movieId: number, isLoading: boolean) => void,
 clearWatchList: () => void,
}

const initialState = {
 watchLists: [],
 status: SyncStatus.LOCAL,
 loadingMovies: new Set<number>(),
}

export const useWatchListStore = create<WatchListState>((set) => ({
 ...initialState,
 fetchWatchLists: async () => {
  set({ status: SyncStatus.LOADING });
  try {
   const response = await getWatchListsApi();
   const movies: TMDBMovie[] = response.data || [];
   set({ watchLists: movies, status: SyncStatus.SYNCED });
  } catch (error: any) {
   set({ status: SyncStatus.FAILED });
   // if (error?.response) {
   //  toast.error(error.response.data?.message || "Failed to fetch watchlist");
   // } else {
   //  toast.error(error?.message || "Failed to fetch watchlist");
   // }
   throw error;
  }
 },
 addWatchList: async (movie: TMDBMovie) => {
  set((state) => ({ watchLists: [...state.watchLists, movie] }));
 },
 deleteWatchList: async (id: number) => {
  set((state) => ({
   watchLists: state.watchLists.filter((m) => {
    const movieId = (m as any).movie_id ?? m.id;
    return movieId !== id;
   })
  }));
 },
 setLoadingMovie: (movieId: number, isLoading: boolean) => {
  set((state) => {
   const newLoadingMovies = new Set(state.loadingMovies);
   if (isLoading) {
    newLoadingMovies.add(movieId);
   } else {
    newLoadingMovies.delete(movieId);
   }
   return { loadingMovies: newLoadingMovies };
  });
 },
 clearWatchList: () => {
  set({ ...initialState });
 }
}))
