import { useEffect, useState } from 'react';
import { getWatchlist } from '@/lib/watchlist';
import type { Movie } from '@/types';
import { MovieCard } from '@/components/carousel/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  return (
    <div className='px-16 py-8'>
      <h1 className='text-white text-2xl font-bold mb-6'>Your Watchlist</h1>

      {movies.length === 0 ? (
        <div className='text-neutral-400'>
          Your watchlist is empty. Add movies from any list using the + button.
        </div>
      ) : (
        <Carousel
          opts={{ align: 'start', loop: true }}
          className='w-full'
        >
          <CarouselContent className='-ml-2 md:-ml-4'>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className='pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  year={String(movie.year)}
                  rating={movie.rating}
                  genre={typeof movie.genre === 'string' ? movie.genre : Array.isArray(movie.genre) ? movie.genre.join(', ') : ''}
                  image={movie.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-2 bg-black/70 hover:bg-black border-neutral-700 text-white' />
          <CarouselNext className='right-2 bg-black/70 hover:bg-black border-neutral-700 text-white' />
        </Carousel>
      )}
    </div>
  );
}
