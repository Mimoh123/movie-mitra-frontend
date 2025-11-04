import { MovieCard } from '@/components/carousel/Card';
import { GenreSection } from '@/components/carousel/GenereSection';
import {
  comedyMovies,
  dramaMovies,
  actionMovies,
  thrillerMovies,
  scifiMovies,
} from '@/data/movieData';

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { FeaturedHero } from './Hero';

function Home() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className=' flex flex-col space-y-10'>
      <FeaturedHero />
      <div className=''>
        <GenreSection title='Action & Adventure' movies={actionMovies} />
        <GenreSection title='Drama & Romance' movies={dramaMovies} />
        <GenreSection title='Comedy & Fun' movies={comedyMovies} />
        <GenreSection title='Thriller & Mystery' movies={thrillerMovies} />
        <GenreSection title='Sci-Fi & Fantasy' movies={scifiMovies} />
      </div>
    </div>
  );
}

export default Home;
