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