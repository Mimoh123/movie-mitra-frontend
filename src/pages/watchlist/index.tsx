import { MovieCard } from '@/components/carousel/Card';
import { useWatchListStore } from '@/stores';

function Watchlist() {
  const { watchLists } = useWatchListStore();

  return (
    <div className=' flex flex-col space-y-10 py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[5%]'>
      <h1 className='text-2xl font-bold'>Watchlist</h1>
      {watchLists.length > 0 ? (
        <section className='grid grid-cols-4 gap-10'>
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
