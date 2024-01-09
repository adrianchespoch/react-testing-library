import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../src/hooks/useFetch';

describe('Pruebas en useFetch', () => {
  test('should return initState', () => {
    const { result } = renderHook(() => useFetch('One Punch'));
    const { images, isLoading } = result.current;

    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test('should return 1 array de imgs e isLoading in false', async () => {
    const { result } = renderHook(() => useFetch('One Punch'));

    // Espera a q esta condicion se cumpla:
    await waitFor(() =>
      expect(result.current.images.length).toBeGreaterThan(0)
    );

    // Acersiones respectivas Despues de q el hook haga su W:
    const { images, isLoading } = result.current;
    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
