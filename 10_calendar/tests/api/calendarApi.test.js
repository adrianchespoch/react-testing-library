import { calendarApi } from '../../src/api/calendarApi';

describe('pruebas en calendarApi', () => {
  test('debe tener la config por default', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('debe tener el Bearer token en todas las peticiones', async () => {
    const token = 'ANS-124-sdf-4-AD';
    localStorage.setItem('token', token);

    // Testear q en los headers se tenga el Bearer token
    try {
      const res = await calendarApi.get('/events');
      console.log(res);
    } catch (error) {
      expect(error.config.headers.Authorization).toBe(`Bearer ${token}`);

      // Si se usa un header personal:    error.config.headers['x-token']
    }
  });
});
