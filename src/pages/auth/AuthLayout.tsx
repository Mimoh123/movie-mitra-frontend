import React from 'react';
import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <section className=''>
        <Outlet></Outlet>
      </section>
    </div>
  );
}

export default AuthLayout;
