import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/';

    login('Alex Auth');

    navigate(lastPath, { replace: true });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};
