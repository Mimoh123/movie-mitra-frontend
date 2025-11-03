import React from "react";

function RootLayout() {
  return (
    <div className='w-screen h-screen flex flex-col justify-between items-center bg-[#2D2C2C]'>
      <section className=' text-white'> 
 
 <nav className="w-full bg-[#222222] ">
      <div className="flex justify-between items-center mx-auto">
        {/* Logo Section */}
        <div className="flex items-center justify-start ">
          <img src="./logo.png" alt="logo" className="h-16 w-auto m-1 object-contain "/>
          
          <div className="text-white text-2xl font-semibold mr-210">MovieMitra</div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-14">
          <a href="#" className="text-white hover:text-gray-400 transition-colors duration-200 font-medium ">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors duration-200 font-medium">
            Recommendator
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors duration-200 font-medium">
            Watchlist
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors duration-200 font-medium">
            About
          </a>
        </div>
        
        {/* User Profile Icon */}
        <div className="flex items-center ml-7 mr-3">
          <button className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
<div className="border-1 border-white"></div>
<h1 className=" flex justify-center text-5xl m-7 font-bold ">Discover  cinemas/movies...</h1>

</section>

    </div>
  );
}

export default RootLayout;
