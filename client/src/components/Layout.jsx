import React from 'react'
import {Outlet} from "react-router-dom";
import Footer from './Footer';

import NavigationBar from './NavigationBar';

const Layout = () => {
  return (
    <>
    <NavigationBar />
    <div className='container'>
      <Outlet/>
    </div>
    <Footer />
    </>
    
  )
}

export default Layout;