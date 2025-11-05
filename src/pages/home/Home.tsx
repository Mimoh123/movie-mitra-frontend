import { GenreSection } from '@/components/carousel/GenereSection';
import { FeaturedHero } from './Hero';
import { useMovieStore } from '@/stores';

function Home() {
  const { movies } = useMovieStore();
  return (
    <div className=' flex flex-col space-y-10 '>
      <FeaturedHero />
      <div className='w-full relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[20%] 2xl:px-[30%]'>
        <GenreSection title='Action & Adventure' movies={movies} />
        <GenreSection title='Drama & Romance' movies={movies} />
        <GenreSection title='Comedy & Fun' movies={movies} />
        <GenreSection title='Thriller & Mystery' movies={movies} />
        <GenreSection title='Sci-Fi & Fantasy' movies={movies} />
      </div>
    </div>
  );
}

export default Home;
