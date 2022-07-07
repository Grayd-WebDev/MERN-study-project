import React from 'react'
import {Link, Outlet} from "react-router-dom";

import NavigationBar from './NavigationBar';

const Layout = () => {
  return (
    <>
    <NavigationBar />
    <div className='container'>
    <Outlet/>

    </div>
    </>
    
  )
}

export default Layout;