import React from 'react';
import './SideNav.scss';
import logo from '../logo.svg'

function SideNav() {
  return (
    <div className="side-nav">
      <img className="profile-round" src={logo} alt="My Pic"/>
      <ul>
          <li>Developer</li>
          <li>Photographer</li>
          <li>Writer</li>
      </ul>
    </div>
  );
}

export default SideNav;