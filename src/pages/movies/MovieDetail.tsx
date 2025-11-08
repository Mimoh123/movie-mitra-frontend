import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Loader } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TMDBMovie } from '@/types';
import { getGenreName } from '@/data/genreId';
import {
  createWatchListApi,
  deleteWatchListApi,
  getMovieById,
} from '@/utils/API';
import { useWatchListStore, useMovieStore } from '@/stores';
import { toast } from 'sonner';

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies } = useMovieStore();
  const {
    addWatchList,
    deleteWatchList,
    watchLists,
    setLoadingMovie,
    loadingMovies,
  } = useWatchListStore();

  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [isFetchingMovie, setIsFetchingMovie] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError('Movie ID is required');
        setIsFetchingMovie(false);
        return;
      }

      // First, try to find movie in store
      const foundMovie = movies.find((m) => {
        const movieId = (m as any).movie_id ?? m.id;
        return String(movieId) === id || String(m.id) === id;
      });

      if (foundMovie) {
        setMovie(foundMovie);
        setIsFetchingMovie(false);
        setError(null);
        return;
      }

      // If not found in store, fetch from TMDB API
      setIsFetchingMovie(true);
      try {
        const fetchedMovie = await getMovieById(id);
        setMovie(fetchedMovie);
        setError(null);
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.status_message ||
          err?.message ||
          'Failed to fetch movie';
        setError(errorMessage);
        toast.error(errorMessage);
        // Navigate back after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setIsFetchingMovie(false);
      }
    };

    fetchMovie();
  }, [id, movies, navigate]);

  if (isFetchingMovie) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader size='lg' />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-red-500 text-lg mb-4'>
            {error || 'Movie not found'}
          </p>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const movieId = (movie as any).movie_id ?? movie.id;
  const isInWatchlist = watchLists.some((watchlistMovie) => {
    const watchlistMovieId =
      (watchlistMovie as any).movie_id ?? watchlistMovie.id;
    return watchlistMovieId === movieId;
  });
  const isLoading = loadingMovies.has(movieId);

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
    <div className='relative min-h-[73vh] w-full overflow-hidden'>
      <img
        src={`https://image.tmdb.org/t/p/w1280/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.title}
        className='w-full h-full object-cover object-center'
        loading='eager'
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        }}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />

      <div className='absolute bottom-0 left-0 right-0 p-8 md:p-16'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex flex-wrap gap-2 mb-6'>
            {movie.genre_ids.map((genreId) => (
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
            {movie.title}
          </h1>

          <p className='text-gray-300 mb-8 max-w-2xl text-lg leading-relaxed'>
            {movie.overview}
          </p>

          <div className='flex flex-wrap gap-4 mb-4'>
            {movie.release_date && (
              <div className='text-gray-300'>
                <span className='font-semibold'>Release Date: </span>
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
            )}
            {movie.vote_average > 0 && (
              <div className='text-gray-300'>
                <span className='font-semibold'>Rating: </span>
                {movie.vote_average.toFixed(1)} / 10
              </div>
            )}
          </div>

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

export default MovieDetail;
