import { MovieCard } from './Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Movie {
  id: string;
  title: string;
  year: string;
  rating: number;
  genre: string;
  image: string;
}

interface GenreSectionProps {
  title: string;
  movies: Movie[];
}

export function GenreSection({ title, movies }: GenreSectionProps) {
  return (
    <div className='mb-16'>
      <h2 className='text-white mb-6 px-4'>{title}</h2>
      <div className='px-16'>
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
          <CarouselPrevious className='left-2 bg-black/70 hover:bg-black border-neutral-700 text-white' />
          <CarouselNext className='right-2 bg-black/70 hover:bg-black border-neutral-700 text-white' />
        </Carousel>
      </div>
    </div>
  );
}
