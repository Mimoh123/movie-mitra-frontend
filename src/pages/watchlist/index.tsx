import { GenreSection } from '@/components/carousel/GenereSection';
import { actionMovies } from '@/data/movieData';
import React from 'react';

function Watchlist() {
  return (
    <div className=' flex flex-col space-y-10 py-10'>
      <section className=''>
        <GenreSection title='Watch List' movies={actionMovies} />
      </section>
    </div>
  );
}

export default Watchlist;
