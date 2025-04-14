import React from 'react';
import Navbar from './Navbar';

const Adminlayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed-width Navbar */}
      <div className="w-64 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Adminlayout;
