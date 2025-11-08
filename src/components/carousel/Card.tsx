import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Loader } from '@mantine/core';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TMDBMovie } from '@/types';
import { createWatchListApi, deleteWatchListApi } from '@/utils/API';
import { useWatchListStore } from '@/stores';
import { toast } from 'sonner';

export function MovieCard({ movie }: { movie: TMDBMovie }) {
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

  const createWatchList = async (movie: TMDBMovie) => {
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
    <Card
      className='bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:border-gray-600 w-full'
      onClick={() => navigate(`/movies/${movieId}`)}
    >
      <div className='relative aspect-[3/4] overflow-hidden bg-gray-900'>
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
        <div
          className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'
          // onClick={(e) => e.stopPropagation()}
        >
          <Button
            size='sm'
            className='bg-white text-black hover:bg-gray-200'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/recommendation?movieId=${movieId}`);
            }}
          >
            Recommend
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='border-white w-10 text-white hover:bg-white hover:text-black'
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
        <div className='absolute top-3 right-3'>
          <Badge className='bg-black/80 text-white border-gray-700'>
            <Star className='h-3 w-3 mr-1 fill-yellow-400 text-yellow-400' />
            {movie.vote_average}
          </Badge>
        </div>
      </div>
      <div className='p-2 sm:p-3 md:p-4 !py-0'>
        <h3 className='text-white truncate mb-1 sm:mb-1 text-sm sm:text-base'>
          {movie.title}
        </h3>
        <div className='flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 flex-wrap'>
          <span className='text-gray-400 text-xs sm:text-sm'>
            {movie.release_date}
          </span>
        </div>
        {/* <div className='flex items-center justify-between'>
          <Button
            size='sm'
            className=' text-neutral-400 bg-inherit border-b border-white shadow-none rounded-none'
          >
            Recommend
          </Button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (isInWatchlist || movie.isFavourite) {
                deleteWatchListFunction(movie);
              } else {
                createWatchList(movie);
              }
            }}
            className='cursor-pointer transition-colors hover:opacity-80'
          >
            <Heart
              className={`h-5 w-5 ${
                isInWatchlist || movie.isFavourite || isLiked
                  ? 'fill-red-600 text-red-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            />
          </button>
        </div> */}
      </div>
    </Card>
  );
}
