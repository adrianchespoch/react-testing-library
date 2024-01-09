import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {
  const status = useCheckAuth();

  // Depende del Auth
  if (status === 'checking') return <CheckingAuth />;

  return (
    <Routes>
      {/* Proteccion de rutas:  */}
      {status === 'authenticated' ? (
        <Route path="*" element={<JournalRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      <Route path="*" element={<Navigate to="/auth/login" replace />} />

      {/* Login & Register */}
      {/* <Route path="auth/*" element={<AuthRoutes />} /> */}

      {/* Journal App */}
      {/* <Route path="*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
