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
    id: 'recommendation',
    label: 'Recommendation',
    path: '/recommendation',
  },
  { id: 'watchlist', label: 'Watchlist', icon: Heart, path: '/watchlist' },
  { id: 'login', label: 'Login', path: '/auth/login' },
];
function RootLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [navItems, setNavItems] =
    useState<
      { id: string; label: string; icon?: React.ElementType; path: string }[]
    >(defaultNavItems);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
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
  // Update token state when localStorage changes
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem('token'));
    };
    // Check on mount
    checkToken();
    // Listen for storage events (works across tabs)
    window.addEventListener('storage', checkToken);
    // Also check when location changes (for same-tab changes)
    checkToken();
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (userStatus === SyncStatus.LOCAL && token) {
      fetchUserData();
    }
  }, [userStatus, fetchUserData, token]);
  useEffect(() => {
    console.log('this is the user data', userData);
  }, [userData]);
  useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (currentToken && userData.name) {
      console.log('i am inside');
      const newNavItems = defaultNavItems.filter(
        (item) => item.id !== 'sign up' && item.id !== 'login'
      );
      setNavItems([
        ...newNavItems,
        {
          id: 'profile',
          label: userData.name,
          icon: UserCircle,
          path: '/profile',
        },
      ]);
    } else if (!currentToken) {
      // Reset to default nav items when logged out
      setNavItems(defaultNavItems);
    }
  }, [userStatus, userData, token]);
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <div className='w-full min-h-screen flex flex-col justify-between items-center bg-gray-950 '>
      <section className=' text-white w-full '>
        <nav className='border-b border-gray-800 bg-gray-900'>
          <div className='w-full '>
            <div className='flex items-center justify-between py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[5%] w-full'>
              <Link to='/' className='flex items-center gap-3'>
                {/* <img src={logo} alt='logo' className='h-10 w-10' /> */}
                <h1 className='text-2xl font-bold'>MovieMitra</h1>
              </Link>

              <div className='flex items-center gap-1'>
                {navItems.map((item) => {
                  const Icon = item.icon as React.ElementType;
                  const isActive =
                    activeTab.split('/')[1] === item.path.split('/')[1];

                  return (
                    <Link key={item.id} to={item.path}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab(item.path)}
                        className={`flex items-center gap-2 ${
                          isActive
                            ? ' text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
