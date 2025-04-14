import React from 'react';
import Navbar1 from './Navbar1';
import Footer from './Footer';

const Mainlayout = ({ children }) => {
  return (
    <div>
      <Navbar1 />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
