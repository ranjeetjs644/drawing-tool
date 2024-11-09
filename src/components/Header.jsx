import React from 'react'
import Hanburger from './Hanburger'
import Toolbar from './Toolbar'
import Share from './Share'
import { DrawingProvider } from "../context/DrawingContext.jsx";

const Header = () => {
  return (
    <header className='w-[90%] mx-auto flex items-center justify-around'>
      <DrawingProvider>
        <Hanburger />
        <Toolbar />
        <Share />
      </DrawingProvider>
    </header>
  );
}

export default Header;