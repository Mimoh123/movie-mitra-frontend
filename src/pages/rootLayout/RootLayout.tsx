import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Film, Home, Heart, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from './././../../public/logo.png';
import { getAllMovies } from '@/utils/API';
import { useMovieStore, useUserStore } from '@/stores';
import { SyncStatus } from '@/types';
const defaultNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  {
    id: 'recommendator',
    label: 'Recommendation',
    // icon: Heart,
    path: '/recommendation',
  },
  { id: 'watchlist', label: 'Watchlist', icon: Heart, path: '/watchlist' },
  // { id: 'sign up', label: 'Sign Up', path: '/auth/register' },
  { id: 'login', label: 'Login', path: '/auth/login' },
];
function RootLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [navItems, setNavItems] =
    useState<
      { id: string; label: string; icon?: React.ElementType; path: string }[]
    >(defaultNavItems);
  const { movies, fetchMovies, status } = useMovieStore();
  const { userData, fetchUserData, userStatus } = useUserStore();

  useEffect(() => {
    if (status === SyncStatus.LOCAL) {
      fetchMovies();
    }
  }, [status, fetchMovies]);
  useEffect(() => {
    console.log('this is the movies', movies);
  }, [movies]);
  useEffect(() => {
    if (userStatus === SyncStatus.LOCAL && localStorage.getItem('token')) {
      fetchUserData();
    }
  }, [userStatus, fetchUserData]);
  useEffect(() => {
    if (
      userStatus === SyncStatus.SYNCED &&
      localStorage.getItem('token') &&
      userData.name
    ) {
      const newNavItems = defaultNavItems.filter(
        (item) => item.id == 'sign up' || item.id == 'login'
      );
      setNavItems([
        ...newNavItems,
        { id: 'profile', label: 'Profile', icon: UserCircle, path: '/profile' },
      ]);
    }
  }, [userStatus]);

  return (
    <div className='w-full min-h-screen flex flex-col justify-between items-center bg-[#2D2C2C] '>
      <section className=' text-white w-full '>
        <nav className='border-b border-neutral-800 bg-black'>
          <div className='container mx-auto px-4'>
            <div className='flex items-center justify-between py-4'>
              <Link to='/' className='flex items-center gap-3'>
                <img src={logo} alt='logo' className='h-10 w-10' />
                <h1 className='text-2xl font-bold'>MovieMitra</h1>
              </Link>

              <div className='flex items-center gap-1'>
                {navItems.map((item) => {
                  const Icon = item.icon as React.ElementType;
                  const isActive = activeTab === item.path;

                  return (
                    <Link key={item.id} to={item.path}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab(item.path)}
                        className={`flex items-center gap-2 ${
                          isActive
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                        } `}
                      >
                        {item.icon && <Icon className='h-4 w-4' />}
                        <span className='hidden sm:inline'>{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <div className='flex items-center justify-center'>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default RootLayout;
