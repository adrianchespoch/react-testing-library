import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const isActive = ({ isActive }) =>
  'nav-item nav-link ' + (isActive ? 'active' : '');

export const Navbar = () => {
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className={isActive} to="/marvel">
            Marvel
          </NavLink>

          <NavLink className={isActive} to="/dc">
            DC
          </NavLink>

          <NavLink className={isActive} to="/search">
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span
            className="nav-item nav-link text-primary"
            aria-label="authUser"
          >
            {user?.name}
          </span>

          <button onClick={handleLogout} className="nav-item nav-link btn">
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
