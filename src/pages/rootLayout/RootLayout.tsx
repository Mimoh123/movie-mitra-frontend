import { Link, Outlet } from 'react-router';

function RootLayout() {
  return (
    <div className='w-full min-h-screen flex flex-col justify-between items-center bg-[#2D2C2C] '>
      <section className=' text-white w-full '>
        <nav className='w-full bg-[#222222] flex items-center justify-center '>
          <div className='w-6xl '>
            <div className='flex w-full justify-between items-center  '>
              {/* Logo Section */}
              <div className='flex items-center justify-start '>
                <img
                  src='./logo.png'
                  alt='logo'
                  className='h-16  object-contain '
                />

                <div className='text-white text-2xl font-semibold '>
                  MovieMitra
                </div>
              </div>

              {/* Navigation Links */}
              <section className='flex items-center space-x-8'>
                <div className='flex items-center space-x-8'>
                  <Link
                    to='/'
                    className='text-white hover:text-gray-400 transition-colors duration-200 font-medium '
                  >
                    Home
                  </Link>
                  <Link
                    to='/recommendator'
                    className='text-white hover:text-gray-400 transition-colors duration-200 font-medium'
                  >
                    Recommendator
                  </Link>
                  <Link
                    to='/watchlist'
                    className='text-white hover:text-gray-400 transition-colors duration-200 font-medium'
                  >
                    Watchlist
                  </Link>
                  <Link
                    to='/about'
                    className='text-white hover:text-gray-400 transition-colors duration-200 font-medium'
                  >
                    About
                  </Link>
                </div>

                {/* User Profile Icon */}
                <div className='flex items-center ml-7 mr-3'>
                  <button className='w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </nav>
        <div className='border-1 border-white'></div>
        {/* <h1 className=' flex justify-center text-5xl m-7 font-bold '>
          Discover cinemas/movies...
        </h1> */}
        <div className='flex items-center justify-center'>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default RootLayout;
