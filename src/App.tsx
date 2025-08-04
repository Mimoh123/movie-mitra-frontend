import React from 'react';
import { Route, Routes } from 'react-router';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import RootLayout from './pages/rootLayout/RootLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<SignUp />} />
        </Route>
        <Route path='/' element={<RootLayout />}>
          <Route path='home' />
        </Route>
      </Routes>
    </>
  );
}

export default App;
