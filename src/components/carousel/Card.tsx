import type { MovieCard } from '@/types';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function Card({ movie }: { movie: MovieCard }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='group'>
      <div className='bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] rounded-lg overflow-hidden  border border-[#3a3a3a] cursor-pointer   relative'>
        {/* Gradient border effect on hover */}
        <div
          className='absolute inset-0 rounded-lg opacity-0  transition-opacity duration-400 pointer-events-none bg-gradient-to-br from-[#505050] to-[#303030] p-[1px]'
          style={{
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        <div className='relative overflow-hidden'>
          <img
            className='w-full h-35 object-cover'
            src={movie.image}
            alt={movie.title}
          />

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
        </div>

        <div className='p-6 space-y-3 relative z-10'>
          <h2 className='font-semibold text-xl text-[#f0f0f0] leading-tight line-clamp-2 h-14'>
            {movie.title}
          </h2>

          <div className='flex items-center gap-4 text-sm text-[#a0a0a0]'>
            {movie.rating && (
              <div className='flex items-center gap-1.5'>
                <span className='text-[#c0c0c0]'>⭐</span>
                <span>{movie.rating}</span>
              </div>
            )}
            {movie.year && (
              <>
                <span>•</span>
                <span>{movie.year}</span>
              </>
            )}
          </div>

          <div className='flex items-center justify-between pt-2'>
            <button
              type='button'
              className='!text-xs bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] text-[#e0e0e0] px-3 py-2  font-semibold rounded-lg border border-[#505050] transition-all duration-300]'
            >
              Recommend
            </button>
            <button type='button' onClick={() => setIsLiked(!isLiked)}>
              <Icon
                icon={isLiked ? 'line-md:heart-filled' : 'line-md:heart'}
                width='24'
                height='24'
                className='text-[#e0e0e0]'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
