import { create } from "zustand";
import { SyncStatus } from "@/types";
import { getDropdownMoviesApi } from "@/utils/API";
import { toast } from "sonner";

interface DropdownMovie {
 movie_id: number;
 title: string;
}

interface DropdownMoviesState {
 movies: DropdownMovie[];
 status: SyncStatus;
 fetchDropdownMovies: () => Promise<void>;
 clearDropdownMovies: () => void;
}

const initialState = {
 movies: [],
 status: SyncStatus.LOCAL,
};

export const useDropdownMoviesStore = create<DropdownMoviesState>((set) => ({
 ...initialState,
 fetchDropdownMovies: async () => {
  // Don't fetch if already synced or loading
  const currentState = useDropdownMoviesStore.getState();
  if (currentState.status === SyncStatus.SYNCED || currentState.status === SyncStatus.LOADING) {
   return;
  }

  set({ status: SyncStatus.LOADING });
  try {
   const response = await getDropdownMoviesApi();
   if (response && response.movies) {
    // Filter duplicates based on movie_id using Map for better performance
    const uniqueMoviesMap = new Map<number, DropdownMovie>();
    response.movies.forEach((movie: DropdownMovie) => {
     if (!uniqueMoviesMap.has(movie.movie_id)) {
      uniqueMoviesMap.set(movie.movie_id, movie);
     }
    });
    const uniqueMovies = Array.from(uniqueMoviesMap.values());
    set({ movies: uniqueMovies, status: SyncStatus.SYNCED });
   } else {
    console.error('Invalid response format:', response);
    set({ status: SyncStatus.FAILED });
   }
  } catch (error: any) {
   console.error('Failed to fetch dropdown movies:', error);
   set({ status: SyncStatus.FAILED });
   if (error?.response) {
    toast.error(error.response.data?.message || "Failed to fetch movies");
   } else {
    toast.error(error?.message || "Failed to fetch movies");
   }
  }
 },
 clearDropdownMovies: () => {
  set({ ...initialState });
 },
}));

