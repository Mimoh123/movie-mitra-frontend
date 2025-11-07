import { useState, useEffect } from 'react';
import { Star, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toggleWatchlist, isInWatchlist } from '@/lib/watchlist';
import type { Movie } from '@/types';

interface MovieCardProps {
  id?: string | number;
  title: string;
  year: string;
  rating: number;
  genre: string;
  image: string;
}

export function MovieCard({
  id,
  title,
  year,
  rating,
  genre,
  image,
}: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const movieId = id ? String(id) : `${title}-${String(year)}`;
    try {
      setIsLiked(isInWatchlist(movieId));
    } catch {
      // ignore
    }
  }, [id, title, year]);

  return (
    <Card className='bg-neutral-900 border-neutral-800 overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:border-neutral-600'>
      <div className='relative aspect-[3/4] overflow-hidden'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
        
        </div>
        <div className='absolute top-3 right-3'>
          <Badge className='bg-black/80 text-white border-neutral-700'>
            <Star className='h-3 w-3 mr-1 fill-yellow-400 text-yellow-400' />
            {rating}
          </Badge>
        </div>
      </div>
      <div className='p-4'>
        <h3 className='text-white truncate mb-2'>{title}</h3>
        <div className='flex items-center gap-2 mb-4'>
          <span className='text-neutral-400'>{year}</span>
          <span className='text-neutral-600'>•</span>
          <span className='text-neutral-500'>{genre}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              setIsFavourite(!isFavourite);
            }}
            className={`h-8 px-3 flex items-center justify-center gap-2 transition-colors rounded ${
              isFavourite
                ? 'bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700'
                : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <span className={`text-lg ${isFavourite ? 'font-semibold text-white' : 'text-neutral-400'}`}>
              Recommend
            </span>
          </Button>

          <Button
            size='lg'
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              const movieId = id ? String(id) : `${title}-${String(year)}`;
              const movie: Movie = {
                id: movieId,
                title,
                year,
                rating,
                genre,
                image,
              };
              try {
                toggleWatchlist(movie);
                setIsLiked(isInWatchlist(movieId));
              } catch {
                // fallback to local toggle
                setIsLiked(!isLiked);
              }
            }}
            className={`h-8 w-8 flex items-center justify-center transition-colors rounded ${
              isLiked
                ? 'bg-pink-600 border-pink-600 text-white hover:bg-pink-700 hover:border-pink-700'
                : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Plus className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
