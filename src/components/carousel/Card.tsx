import { useState } from 'react';
import { Star, Plus, Play, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TMDBMovie } from '@/types';

export function MovieCard({
  title,
  release_date,
  vote_average,
  genre_ids,
  poster_path,
}: TMDBMovie) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className='bg-neutral-900 border-neutral-800 overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:border-neutral-600 w-full'>
      <div className='relative aspect-[3/4] overflow-hidden bg-neutral-800'>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={title}
          className='w-full h-full object-cover object-center'
          loading='lazy'
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (poster_path) {
              target.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
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
            {vote_average}
          </Badge>
        </div>
      </div>
      <div className='p-2 sm:p-3 md:p-4'>
        <h3 className='text-white truncate mb-1 sm:mb-2 text-sm sm:text-base'>
          {title}
        </h3>
        <div className='flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 flex-wrap'>
          <span className='text-neutral-400 text-xs sm:text-sm'>
            {release_date}
          </span>
          {/* <span className='text-neutral-600 hidden sm:inline'>•</span>
          <span className='text-neutral-500 text-xs sm:text-sm max-w-[100px] truncate'>
            {genre_ids.join(', ')}
          </span> */}
        </div>
        <div className='flex items-center gap-1 sm:gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              setIsFavourite(!isFavourite);
            }}
            className={`flex-1 transition-colors ${
              isFavourite
                ? 'bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700'
                : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Recommend
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`flex-1 transition-colors ${
              isLiked
                ? 'bg-pink-600 border-pink-600 text-white hover:bg-pink-700 hover:border-pink-700'
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
