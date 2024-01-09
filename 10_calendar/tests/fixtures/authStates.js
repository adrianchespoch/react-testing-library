export const initState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'asnd123KN',
    name: 'Alex Testing',
    email: 'test@testing.com',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};
