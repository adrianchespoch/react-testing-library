import { useContext } from 'react';

import { AuthContext } from '../auth/context/AuthContext';

export const useAuth = () => useContext(AuthContext);
