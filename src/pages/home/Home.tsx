import { useState, useEffect, useMemo } from 'react';
import { GenreSection } from '@/components/carousel/GenereSection';
import { FeaturedHero } from './Hero';
import { useMovieStore } from '@/stores';
import {
  ActionAdventure,
  ComedyFun,
  DramaRomance,
  SciFiFantasy,
  ThrillerMystery,
} from '@/data/genreId';

function Home() {
  const { movies } = useMovieStore();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const checkGenre = (movieGenre_id: number[], checkForGenre: number[]) => {
    for (const movieGenre of movieGenre_id) {
      if (checkForGenre.includes(movieGenre)) {
        return true;
      }
    }
    return false;
  };

  const currentMovie = useMemo(() => {
    return movies.length > 0 ? movies[currentMovieIndex] : null;
  }, [movies, currentMovieIndex]);

  return (
    <div className=' flex flex-col space-y-10 w-full '>
      {currentMovie && <FeaturedHero movie={currentMovie} />}
      {movies && movies.length > 0 && (
        <div className='w-full relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[5%] overflow-visible'>
          <GenreSection
            title='Action & Adventure'
            movies={movies.filter((movie) =>
              checkGenre(movie.genre_ids, ActionAdventure)
            )}
          />
          <GenreSection
            title='Drama & Romance'
            movies={movies.filter((movie) =>
              checkGenre(movie.genre_ids, DramaRomance)
            )}
          />
          <GenreSection
            title='Comedy & Fun'
            movies={movies.filter((movie) =>
              checkGenre(movie.genre_ids, ComedyFun)
            )}
          />
          <GenreSection
            title='Thriller & Mystery'
            movies={movies.filter((movie) =>
              checkGenre(movie.genre_ids, ThrillerMystery)
            )}
          />
          <GenreSection
            title='Sci-Fi & Fantasy'
            movies={movies.filter((movie) =>
              checkGenre(movie.genre_ids, SciFiFantasy)
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
