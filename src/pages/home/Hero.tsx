import { Play, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function FeaturedHero() {
  return (
    <div className='relative h-[70vh] w-full overflow-hidden'>
      <img
        src='https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBmaWxtfGVufDF8fHx8MTc2MjIzMDc5OXww&ixlib=rb-4.1.0&q=80&w=1080'
        alt='Featured Movie'
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />

      <div className='absolute bottom-0 left-0 right-0 p-8 md:p-16'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex flex-wrap gap-2 mb-6'>
            <Badge className='bg-red-600 text-white border-0'>
              Trending Now
            </Badge>
            <Badge
              variant='outline'
              className='border-neutral-600 text-neutral-300'
            >
              Action
            </Badge>
            <Badge
              variant='outline'
              className='border-neutral-600 text-neutral-300'
            >
              Thriller
            </Badge>
          </div>

          <h1 className='text-white mb-4 max-w-2xl'>Featured Movie Title</h1>

          <p className='text-neutral-300 mb-8 max-w-xl'>
            An epic tale of action and adventure that takes you on a journey
            through time and space. Don't miss this critically acclaimed
            masterpiece.
          </p>

          <div className='flex flex-wrap gap-3'>
            <Button
              size='lg'
              className='bg-white text-black hover:bg-neutral-200'
            >
              <Play className='h-5 w-5 mr-2' />
              Watch Now
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-neutral-600 text-white hover:bg-neutral-900'
            >
              <Plus className='h-5 w-5 mr-2' />
              My List
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-neutral-600 text-white hover:bg-neutral-900'
            >
              <Info className='h-5 w-5 mr-2' />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
