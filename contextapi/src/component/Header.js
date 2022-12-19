import React from 'react'
import UserNavbar from './user/Navbar';
import FrontNavbar from './frontend/Navbar';
const Header = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = localStorage.getItem('user');
  return (
    user ? 
        <UserNavbar/>
        :
        <FrontNavbar/>
  )
}

export default Header
