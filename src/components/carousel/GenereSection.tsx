import type { TMDBMovie } from '@/types';
import { MovieCard } from './Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface GenreSectionProps {
  title: string;
  movies: TMDBMovie[];
}

export function GenreSection({ title, movies }: GenreSectionProps) {
  return (
    <div className='mb-8 sm:mb-12 md:mb-16 w-full'>
      <h2 className='text-white mb-4 sm:mb-6 text-xl sm:text-2xl font-bold px-0'>
        {title}
      </h2>
      <div className='px-0 w-full'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className='w-full'
        >
          <CarouselContent className='-ml-2 md:-ml-4'>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className='pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
              >
                <MovieCard {...movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden sm:flex -left-4 sm:-left-8 md:-left-12 bg-black/70 hover:bg-black border-neutral-700 text-white' />
          <CarouselNext className='hidden sm:flex -right-4 sm:-right-8 md:-right-12 bg-black/70 hover:bg-black border-neutral-700 text-white' />
        </Carousel>
      </div>
    </div>
  );
}
