import { create } from "zustand";
import type { TMDBMovie } from "@/types";
import { SyncStatus } from "@/types";
import { getRecommendationsApi } from "@/utils/API";

interface RecommendationsState {
  recommendations: TMDBMovie[];
  status: SyncStatus;
  selectedMovieId: number | null;
  selectedMovieTitle: string | null;
  selectedValue: string | null;

  fetchRecommendations: (movieId?: number, movieTitle?: string) => Promise<void>;
  clearRecommendations: () => void;
  setSelectedValue: (value: string | null) => void;
}

const initialState = {
  recommendations: [],
  status: SyncStatus.LOCAL,
  selectedMovieId: null,
  selectedMovieTitle: null,
  selectedValue: null,
};

export const useRecommendationsStore = create<RecommendationsState>((set) => ({
  ...initialState,
  fetchRecommendations: async (movieId?: number, movieTitle?: string) => {
    if (!movieId && !movieTitle) {
      set({ status: SyncStatus.FAILED });
      throw new Error("Either movieId or movieTitle must be provided");
    }

    set({ status: SyncStatus.LOADING });
    try {
      const response = await getRecommendationsApi(movieId, movieTitle);
      if (Array.isArray(response)) {
        // API returns TMDBMovie format directly, filter duplicates by id
        const uniqueMoviesMap = new Map<number, TMDBMovie>();
        response.forEach((movie: TMDBMovie) => {
          if (!uniqueMoviesMap.has(movie.id)) {
            uniqueMoviesMap.set(movie.id, movie);
          }
        });
        const uniqueMovies = Array.from(uniqueMoviesMap.values());
        set({
          recommendations: uniqueMovies,
          status: SyncStatus.SYNCED,
          selectedMovieId: movieId || null,
          selectedMovieTitle: movieTitle || null,
          selectedValue: movieId ? String(movieId) : null,
        });
      } else {
        set({ status: SyncStatus.FAILED });
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      set({ status: SyncStatus.FAILED });
      throw error;
    }
  },
  clearRecommendations: () => {
    set({
      recommendations: [],
      status: SyncStatus.LOCAL,
      selectedMovieId: null,
      selectedMovieTitle: null,
      selectedValue: null,
    });
  },
  setSelectedValue: (value: string | null) => {
    set({ selectedValue: value });
  },
}));

