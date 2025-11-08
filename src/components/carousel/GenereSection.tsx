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
  console.log('this is the title', title);
  console.log('this is the movies', movies.length);
  return (
    <div className='mb-8 sm:mb-12 md:mb-16 w-full'>
      <h2 className='text-white mb-4 sm:mb-6 text-xl sm:text-2xl font-bold px-0'>
        {title}
      </h2>
      <div className='px-0 w-full relative'>
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
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='flex -left-2 sm:-left-4 md:-left-6 lg:-left-8 xl:-left-10 bg-black/70 hover:bg-black border-neutral-700 text-white z-10' />
          <CarouselNext className='flex -right-2 sm:-right-4 md:-right-6 lg:-right-8 xl:-right-10 bg-black/70 hover:bg-black border-neutral-700 text-white z-10' />
        </Carousel>
      </div>
    </div>
  );
}
