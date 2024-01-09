import { render, screen } from '@testing-library/react';

import { GifGrid } from '../../src/components/GifGrid';
import { useFetch } from '../../src/hooks/useFetch';

jest.mock('./../../src/hooks/useFetch');

describe('Pruebas sobre GifGrid.jsx', () => {
  const category = 'One Punch';

  test('should mostar el loading inicialmente', () => {
    useFetch.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);

    expect(screen.getByText('Loading...'));
    expect(screen.getByText(category));
  });

  test('should mostrar item cuando se cargan las imgs useFetch', () => {
    const gifs = [
      { id: 'ABC', title: 'Saitama', url: 'https://saitama.jpg' },
      { id: '123', title: 'Goku', url: 'https://goku.jpg' },
    ];

    // Mock a un Hook
    useFetch.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    expect(screen.getAllByRole('img').length).toBe(gifs.length);
  });
});
