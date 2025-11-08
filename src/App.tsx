import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ChangePassword from './pages/auth/ChangePassword';
import RootLayout from './pages/rootLayout/RootLayout';

import Home from './pages/home/Home';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import Watchlist from './pages/watchlist';
import { useUserStore, useWatchListStore } from './stores';
import { SyncStatus } from './types';

function App() {
  const token = localStorage.getItem('token');
  const { userData, fetchUserData, userStatus } = useUserStore();
  const { watchLists, fetchWatchLists, status } = useWatchListStore();
  useEffect(() => {
    if (token) {
      if (userStatus === SyncStatus.LOCAL) {
        fetchUserData();
      }
      if (status === SyncStatus.LOCAL) {
        fetchWatchLists();
        console.log('this is the watchlists', watchLists);
      }
    }
  }, [token, userStatus, status, watchLists, fetchUserData, fetchWatchLists]);

  return (
    <div className='h-screen overflow-y-auto hide-scrollbar'>
      <MantineProvider>
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<SignUp />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='recommendation' />
            <Route path='watchlist' element={<Watchlist />} />
            <Route path='about' />
          </Route>
        </Routes>
      </MantineProvider>
    </div>
  );
}

export default App;
