import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {  Home, Heart, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from './../../../public/logo.png';

function RootLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    {
      id: 'recommendator',
      label: 'Recommendator',
      icon: Heart,
      path: '/recommendator',
    },
    { id: 'watchlist', label: 'Watchlist', icon: Heart, path: '/watchlist' },
  { id: 'login', label: 'Login', icon: UserCircle, path: '/auth/login' },
  ];

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
                  const Icon = item.icon;
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
                        }`}
                      >
                        <Icon className='h-4 w-4' />
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
