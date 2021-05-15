import React from 'react';
// import { NavLink } from 'react-router-dom';
import './LeftMenuItems.scss';
// import settingsIcon from 'assets/images/icons/settings.svg';
// import dashboardIcon from 'assets/images/icons/dashboard.svg';

const LeftMenuItems = () => {
  return (
    <ul className="left-menu-items mt-1 w-full text-white"> 
      <li>
        {/* <NavLink exact activeClassName="active" className="block p-5" to="/">
          <img className="block mx-auto w-5 h-auto" src={dashboardIcon} alt="dashboard"/>
        </NavLink> */}
      </li>
      <li>
        {/* <NavLink exact activeClassName="active" className="block p-5" to="/settings">
          <img className="block mx-auto" src={settingsIcon} alt="settings"/>
        </NavLink> */}
      </li>
    </ul>
  );
};

export default LeftMenuItems;
