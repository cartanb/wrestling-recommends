import React from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div id="header">
      <Link
        to="/"
        onClick={() => (location.pathname === '/' ? navigate(0) : null)}
      >
        <img src="./assets/logo.svg" alt="Wrestling Recommends" />
      </Link>
      <div id="navbar">
        <NavLink to="/">
          <span>HOME</span>
        </NavLink>
        <NavLink to="/extras">
          <span>EXTRAS</span>
        </NavLink>
        <NavLink to="credits">
          <span>CREDITS</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
