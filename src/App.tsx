import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import RootLayout from './pages/rootLayout/RootLayout';

import Home from './pages/home/Home';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Toaster } from 'sonner';
import Watchlist from './pages/watchlist';
import Recommendation from './pages/recommendation';
import Profile from './pages/profile';
import { useUserStore, useWatchListStore } from './stores';
import { SyncStatus } from './types';

function App() {
  const token = localStorage.getItem('token');
  // const { fetchUserData, userStatus } = useUserStore();
  // const { watchLists, fetchWatchLists, status } = useWatchListStore();
  // useEffect(() => {
  //   if (token) {
  //     // if (userStatus === SyncStatus.LOCAL) {
  //     //   fetchUserData();
  //     // }
  //     // if (status === SyncStatus.LOCAL) {
  //     //   fetchWatchLists();
  //     // }
  //   }
  // }, [token, userStatus, status, watchLists, fetchUserData, fetchWatchLists]);

  return (
    <div className='h-screen overflow-y-auto hide-scrollbar'>
      <MantineProvider>
        <Toaster position='top-right' richColors />
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<SignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='recommendation' element={<Recommendation />} />
            <Route path='watchlist' element={<Watchlist />} />
            <Route path='profile' element={<Profile />} />
            <Route path='about' />
          </Route>
        </Routes>
      </MantineProvider>
    </div>
  );
}

export default App;
