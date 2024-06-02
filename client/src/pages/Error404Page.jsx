// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white  p-8 rounded-lg shadow-lg text-center flex items-center justify-center flex-col bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 overflow-x-hidden">
        <img src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?fit=crop&w=500&q=80" alt="404 Not Found" className="w-full max-w-xs mb-4" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
        <button className='btn'>
        <Link to="/" className="text-blue-500 text-lg  hover:text-blue-700">
          Go to Home
        </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
