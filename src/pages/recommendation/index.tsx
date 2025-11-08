import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select } from '@mantine/core';
import { Search, X } from 'lucide-react';
import type { TMDBMovie } from '@/types';
import { MovieCard } from '@/components/carousel/Card';
import { useWatchListStore } from '@/stores';

function Recommendation() {
  const [recommendations, setRecommendations] = useState<TMDBMovie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { watchLists } = useWatchListStore();
  const movieIdFromUrl = searchParams.get('movieId');

  // Create select options from watchlist movies
  const selectOptions = useMemo(() => {
    return watchLists.map((movie) => {
      const movieId = (movie as any).movie_id ?? movie.id;
      return {
        value: String(movieId),
        label: movie.title,
      };
    });
  }, [watchLists]);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  useEffect(() => {
    setSelectedValue(movieIdFromUrl || null);
    setSearchParams({});
  }, []);

  // Handle select change

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[5%] py-8'>
      {/* Header Section */}
      <div className='w-full max-w-2xl mb-8 text-center'>
        <h1 className='text-white mb-4 text-4xl md:text-5xl font-bold'>
          Recommendation Section
        </h1>
        <p className='text-gray-300 text-lg md:text-xl'>
          Discover your next favorite movie! Select a genre or search for
          recommendations based on your preferences.
        </p>
      </div>

      {/* Centered Select with searchable functionality */}
      <div
        className={`w-full max-w-2xl ${
          recommendations.length > 0 ? 'mb-12' : 'mb-8'
        }`}
      >
        <Select
          placeholder='Search for recommendations...'
          data={selectOptions}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
          searchable
          size='xl'
          dropdownOpened={dropdownOpened}
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
          rightSection={
            <div className='flex items-center gap-2'>
              {selectedValue && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDropdownOpened(false);
                    setSelectedValue(null);
                    // Blur any active element to prevent Select from opening
                    setTimeout(() => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }, 0);
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  type='button'
                  className='flex items-center justify-center hover:bg-gray-800 cursor-pointer rounded-full p-1 transition-colors pointer-events-auto'
                  aria-label='Clear selection'
                >
                  <X className='h-5 w-5 text-gray-400 hover:text-white pointer-events-none' />
                </button>
              )}
              {!selectedValue && (
                <button className='h-5 w-5 opacity-0 pointer-events-none p-2 mr-2'>
                  <X className='h-5 w-5 text-gray-400 hover:text-white pointer-events-none' />
                </button>
              )}
              <Search className='h-5 w-5 text-gray-400' />
            </div>
          }
          styles={{
            input: {
              backgroundColor: '#111827',
              borderRadius: '20px',
              color: 'white',
              borderColor: '#404040',
              fontSize: '1.125rem',
              height: '51px',
            },
            dropdown: {
              backgroundColor: '#111827',
              borderColor: '#404040',
            },
            option: {
              backgroundColor: '#111827',
              color: 'white',
              '&:hover': {
                backgroundColor: '#262626',
              },
            },
            section: {
              marginLeft: '1rem',
              paddingRight: '2rem',
            },
          }}
        />
      </div>

      {/* Recommendations Grid */}
      {recommendations.length > 0 ? (
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6'>
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='text-gray-400 text-center py-12'>
          <p>No recommendations yet. Select an option above to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
