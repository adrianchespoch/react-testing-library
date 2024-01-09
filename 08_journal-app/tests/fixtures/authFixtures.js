export const initState = {
  status: 'checking', // 'not-authenticated', 'checking' , 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated', // 'not-authenticated', 'checking' , 'authenticated'
  uid: 'ASC124HS',
  email: 'test@test.com',
  displayName: 'Test user',
  photoURL: 'https://test.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated', // 'not-authenticated', 'checking' , 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: 'ASC124HS',
  email: 'test@test.com',
  displayName: 'Test user',
  photoURL: 'https://test.jpg',
};
