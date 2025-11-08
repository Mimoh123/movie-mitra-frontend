import { MovieCard } from '@/components/carousel/Card';
import { useWatchListStore } from '@/stores';

function Watchlist() {
  const { watchLists } = useWatchListStore();

  return (
    <div className=' flex flex-col space-y-10 py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[5%]'>
      {/* Header Section */}
      <div className='w-full mb-8'>
        <h1 className='text-white mb-4 text-4xl md:text-5xl font-bold'>
          My Watchlist
        </h1>
        <p className='text-gray-300 text-lg md:text-xl'>
          Keep track of all the movies you want to watch. Your personal
          collection of must-see films, all in one place.
        </p>
      </div>

      {watchLists.length > 0 ? (
        <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6'>
          {watchLists.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : (
        <section className=''>
          <div className='flex flex-col items-center justify-center h-full py-12'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              No movies in your watchlist yet
            </h2>
            <p className='text-gray-400 text-center'>
              Start adding movies to your watchlist to keep track of what you
              want to watch next.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Watchlist;
