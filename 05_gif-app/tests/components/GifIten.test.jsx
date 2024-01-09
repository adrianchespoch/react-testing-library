import { render, screen } from '@testing-library/react';

import { GifItem } from '../../src/components';

describe('Prubeas sobre GifIten.jsx', () => {
  const title = 'One Punch';
  const url = 'https://giphy.com/';

  test('should hacer match con el snapshot', () => {
    const { container } = render(<GifItem title={title} url={url} />);

    expect(container).toMatchSnapshot();
  });

  test('should return the image with the specified URL and ALT', () => {
    render(<GifItem title={title} url={url} />);
    // screen.debug();

    // expect(screen.getByRole('img').src).toBe(url);
    // expect(screen.getByRole('img').alt).toBe(title);
    const { src, alt } = screen.getByRole('img');
    expect(src).toBe(url);
    expect(alt).toBe(title);
  });

  test('should return the component title', () => {
    render(<GifItem title={title} url={url} />);

    expect(screen.getByText(title)).toBeTruthy();
  });
});
