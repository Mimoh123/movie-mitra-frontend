import Card from '@/components/carousel/Card';
import { movieData } from '@/data/movieData';

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

function Home() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className='py-20 w-6xl flex flex-col space-y-10'>
      <section className='flex items-center justify-center  '>
        <div className='flex w-full space-y-5 flex-col'>
          <h1 className='text-2xl font-bold'>Trending</h1>
          <Carousel
            height={350}
            type='container'
            slideSize={{ base: '100%', '300px': '50%', '500px': '25%' }}
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            emblaOptions={{ loop: true, align: 'start' }}
            className='w-full carousel-with-spaced-buttons'
          >
            {movieData.map((movie) => (
              <Carousel.Slide key={movie.title}>
                <Card movie={movie} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </section>
      <section className='flex items-center justify-center  '>
        <div className='flex w-full space-y-5 flex-col'>
          <h1 className='text-2xl font-bold'>Romance</h1>
          <Carousel
            height={350}
            type='container'
            slideSize={{ base: '100%', '300px': '50%', '500px': '25%' }}
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            emblaOptions={{ loop: true, align: 'start' }}
            className='w-full carousel-with-spaced-buttons'
            styles={{
              control: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
              },
            }}
          >
            {movieData.map((movie) => (
              <Carousel.Slide key={movie.title} className=''>
                <Card movie={movie} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </section>
      <section className='flex items-center justify-center  '>
        <div className='flex w-full space-y-5 flex-col'>
          <h1 className='text-2xl font-bold'>Action</h1>
          <Carousel
            height={350}
            type='container'
            slideSize={{ base: '100%', '300px': '50%', '500px': '25%' }}
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            emblaOptions={{ loop: true, align: 'start' }}
            className='w-full carousel-with-spaced-buttons'
          >
            {movieData.map((movie) => (
              <Carousel.Slide key={movie.title}>
                <Card movie={movie} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}

export default Home;
