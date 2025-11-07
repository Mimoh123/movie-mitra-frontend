import { useState } from 'react';
import { Star, Plus, Play, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TMDBMovie } from '@/types';
import { createWatchListApi, deleteWatchListApi } from '@/utils/API';
import { useWatchListStore } from '@/stores';

export function MovieCard({ movie }: { movie: TMDBMovie }) {
  const [isLiked, setIsLiked] = useState(false);
  const { addWatchList, deleteWatchList } = useWatchListStore();

  const createWatchList = async (movie: TMDBMovie) => {
    try {
      const response = await createWatchListApi(movie);
      addWatchList(response.data as TMDBMovie);
    } catch (error) {
      throw error;
    }
  };

  const deleteWatchListFunction = async (movie: TMDBMovie) => {
    try {
      const response = await deleteWatchListApi(movie);
      if (response) {
        deleteWatchList(movie.id);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className='bg-neutral-900 border-neutral-800 overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:border-neutral-600 w-full'>
      <div className='relative aspect-[3/4] overflow-hidden bg-neutral-800'>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className='w-full h-full object-cover object-center'
          loading='lazy'
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (movie.poster_path) {
              target.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            } else {
              target.src = 'https://via.placeholder.com/500x750?text=No+Image';
            }
          }}
        />
        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
          <Button
            size='sm'
            className='bg-white text-black hover:bg-neutral-200'
          >
            <Play className='h-4 w-4 mr-1' />
            Play
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='border-white text-white hover:bg-white hover:text-black'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        <div className='absolute top-3 right-3'>
          <Badge className='bg-black/80 text-white border-neutral-700'>
            <Star className='h-3 w-3 mr-1 fill-yellow-400 text-yellow-400' />
            {movie.vote_average}
          </Badge>
        </div>
      </div>
      <div className='p-2 sm:p-3 md:p-4'>
        <h3 className='text-white truncate mb-1 sm:mb-2 text-sm sm:text-base'>
          {movie.title}
        </h3>
        <div className='flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 flex-wrap'>
          <span className='text-neutral-400 text-xs sm:text-sm'>
            {movie.release_date}
          </span>
        </div>
        <div className='flex items-center gap-1 sm:gap-2'>
          <Button size='sm' variant='outline'>
            Recommend
          </Button>
          <Button
            size='sm'
            type='button'
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (movie.isFavourite) {
                deleteWatchListFunction(movie);
              } else {
                createWatchList(movie);
              }
            }}
            className={`flex-1 transition-colors ${
              movie.isFavourite
                ? 'bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700'
                : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
