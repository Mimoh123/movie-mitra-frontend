import React from 'react';
import { Route, Routes } from 'react-router';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import RootLayout from './pages/rootLayout/RootLayout';
import Card from './components/carousel/Card';
import Home from './pages/home/Home';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

function App() {
  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<SignUp />} />
          </Route>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='recommendator' />
            <Route path='watchlist' />
            <Route path='about' />
          </Route>
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
