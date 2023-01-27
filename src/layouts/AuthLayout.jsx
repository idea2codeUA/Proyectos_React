import React from 'react';
import { Outlet } from 'react-router';
import logo from "media/logo.png"
const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen background_app'>
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <div><img src={logo} alt="logo" className="fixed right-72 top-6 transform rotate-12 opacity-40"></img></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
