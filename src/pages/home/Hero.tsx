import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Loader } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TMDBMovie } from '@/types';
import { getGenreName } from '@/data/genreId';
import { createWatchListApi, deleteWatchListApi } from '@/utils/API';
import { useWatchListStore } from '@/stores';
import { toast } from 'sonner';

export function FeaturedHero({ movie }: { movie: TMDBMovie }) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayedMovie, setDisplayedMovie] = useState<TMDBMovie>(movie);
  const navigate = useNavigate();
  const {
    addWatchList,
    deleteWatchList,
    watchLists,
    setLoadingMovie,
    loadingMovies,
  } = useWatchListStore();
  const movieId = (movie as any).movie_id ?? movie.id;
  const isInWatchlist = watchLists.some((watchlistMovie) => {
    const watchlistMovieId =
      (watchlistMovie as any).movie_id ?? watchlistMovie.id;
    return watchlistMovieId === movieId;
  });
  const isLoading = loadingMovies.has(movieId);

  useEffect(() => {
    if (movie.id !== displayedMovie.id) {
      setIsVisible(false);
      const timer1 = setTimeout(() => {
        setDisplayedMovie(movie);
        setTimeout(() => setIsVisible(true), 50);
      }, 500);
      return () => clearTimeout(timer1);
    }
  }, [movie, displayedMovie.id]);
  const createWatchList = async (movie: TMDBMovie) => {
    setLoadingMovie(movieId, true);
    try {
      const response = await createWatchListApi(movie);
      addWatchList(response.data as TMDBMovie);
    } catch (error: any) {
      if (error?.response) {
        toast.error(
          error.response.data?.message || 'Failed to add to watchlist'
        );
      } else {
        toast.error(error?.message || 'Failed to add to watchlist');
      }
      throw error;
    } finally {
      setLoadingMovie(movieId, false);
    }
  };

  const deleteWatchListFunction = async (movie: TMDBMovie) => {
    setLoadingMovie(movieId, true);
    try {
      const id = watchLists.find((watch) => watch.movie_id === movieId)?.id;
      const response = await deleteWatchListApi(
        String(id || movie.movie_id || movie.id)
      );

      if (response) {
        deleteWatchList(movieId);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(
          error.response.data?.message || 'Failed to remove from watchlist'
        );
      } else {
        toast.error(error?.message || 'Failed to remove from watchlist');
      }
      throw error;
    } finally {
      setLoadingMovie(movieId, false);
    }
  };

  return (
    <div className='relative h-[73vh] w-full overflow-hidden'>
      <img
        src={`https://image.tmdb.org/t/p/w1280/${displayedMovie.poster_path}`}
        alt={displayedMovie.title}
        className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        loading='eager'
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://image.tmdb.org/t/p/original/${displayedMovie.poster_path}`;
        }}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />

      <div
        className={`absolute bottom-0 left-0 right-0 p-8 md:p-16 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='container mx-auto max-w-7xl '>
          <div className='flex flex-wrap gap-2 mb-6'>
            <Badge className='bg-red-600 text-lg text-center px-5 text-white border-0'>
              Trending Now
            </Badge>
            {displayedMovie.genre_ids.map((genreId) => (
              <Badge
                key={genreId}
                variant='outline'
                className='border-gray-600 text-lg text-center px-5 text-gray-300'
              >
                {getGenreName(genreId)}
              </Badge>
            ))}
          </div>

          <h1 className='text-white mb-4 max-w-2xl text-4xl font-bold'>
            {displayedMovie.title}
          </h1>

          <p className='text-gray-300 mb-8 max-w-xl h-20 overflow-hidden whitespace-normal truncate'>
            {displayedMovie.overview}
          </p>

          <div className='flex flex-wrap gap-3'>
            <Button
              size='lg'
              className='bg-white text-black !font-semibold hover:bg-gray-200 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/recommendation?movieId=${movieId}`);
              }}
            >
              Recommend
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white w-14 text-white hover:bg-white hover:text-black cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (isInWatchlist) {
                  setLoadingMovie(movieId, true);
                  setTimeout(() => {
                    deleteWatchListFunction(movie);
                  }, 1000);
                } else {
                  setLoadingMovie(movieId, true);
                  setTimeout(() => {
                    createWatchList(movie);
                  }, 1000);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={16} color='blue' />
              ) : (
                <Heart
                  className={`h-5 w-5 ${
                    isInWatchlist
                      ? 'fill-red-600 text-red-600'
                      : 'text-gray-400 hover:text-white'
                  }`}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
