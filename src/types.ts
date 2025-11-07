export type Movie = {
	id: string;
	title: string;
	year: string | number;
	rating: number;
	genre?: string | string[];
	image: string;
	poster?: string;
	description?: string;
};

export type MovieCard = {
 title: string;
 poster: string;
 rating: number;
 description: string;
 image: string;
 year: string
}


export type TMDBMovie = {
 adult: boolean;
 backdrop_path: string | null;
 genre_ids: number[];
 id: number;
 original_language: string;
 original_title: string;
 overview: string | null;
 popularity: number;
 poster_path: string | null;
 release_date: string | null;
 title: string;
 video: boolean;
 vote_average: number;
 vote_count: number;
};


export enum SyncStatus {
 LOCAL,
 INIT_LOADING,
 LOADING,
 AI_LOADING,
 SYNCED,
 FAILED
}