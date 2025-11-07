import { MovieCard } from '@/components/carousel/Card';
import { GenreSection } from '@/components/carousel/GenereSection';
import { actionMovies } from '@/data/movieData';
import { useWatchListStore } from '@/stores';
import React from 'react';

function Watchlist() {
  const { watchLists } = useWatchListStore();

  return (
    <div className=' flex flex-col space-y-10 py-10'>
      {watchLists.length > 0 ? (
        <section className=''>
          {watchLists.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </section>
      ) : (
        <section className=''>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-2xl font-bold'>No watch lists found</h1>
          </div>
        </section>
      )}
    </div>
  );
}

export default Watchlist;
