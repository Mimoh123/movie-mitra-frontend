import { create } from "zustand";
import type { TMDBMovie } from "@/types";
import { SyncStatus } from "@/types";
import { getWatchListsApi } from "@/utils/API";


interface WatchListState {
 watchLists: TMDBMovie[],
 status: SyncStatus,

 fetchWatchLists: () => Promise<void>,
 addWatchList: (movie: TMDBMovie) => Promise<void>,
 deleteWatchList: (id: number) => Promise<void>,
}

const initialState = {
 watchLists: [],
 status: SyncStatus.LOCAL,
}

export const useWatchListStore = create<WatchListState>((set) => ({
 ...initialState,
 fetchWatchLists: async () => {
  set({ status: SyncStatus.LOADING });
  try {
   const response = await getWatchListsApi();
   const movies: TMDBMovie[] = response.data || [];
   set({ watchLists: movies, status: SyncStatus.SYNCED });
  } catch (error) {
   set({ status: SyncStatus.FAILED });
   throw error;
  }
 },
 addWatchList: async (movie: TMDBMovie) => {
  set((state) => ({ watchLists: [...state.watchLists, movie] }));
 },
 deleteWatchList: async (id: number) => {
  set((state) => ({ watchLists: state.watchLists.filter((m) => m.id !== id) }));
 }
}))
