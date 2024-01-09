import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { logged } = useAuth();
  const lastPath = localStorage.getItem('lastPath') || '/';

  // return logged ? <Navigate to={lastPath} /> : children;
  return !logged ? children : <Navigate to={lastPath} />;
};
