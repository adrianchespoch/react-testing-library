import { NavLink } from 'react-router-dom';

const isActive = ({ isActive }) =>
  'nav-item nav-link ' + (isActive ? 'active' : '');

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                'nav-item nav-link ' + (isActive ? 'active' : '')
              }
              href="#"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="about"
              className={isActive}
              aria-current="page"
              href="#"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="login" className={isActive} href="#">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
