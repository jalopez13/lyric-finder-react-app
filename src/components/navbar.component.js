import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5 light">
      <span className="navbar-brand mb-0 h1 mx-auto"> <Link to="/">LyricFinder</Link></span>
    </nav>
  )
}

export default NavBar;
