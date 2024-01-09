import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Pruebas en App', () => {
  const title = 'React Pro';
  const initCounter = 0;

  test('should hacer match con el snapshot', () => {
    const { container } = render(
      <App title={title} initCounter={initCounter} />
    );

    expect(container).toMatchSnapshot();
  });

  test('should mostar el title exacto', () => {
    render(<App title={title} initCounter={initCounter} />);
    // screen.debug();

    expect(screen.getByText(title)).toBeTruthy();
  });

  test('should mostrar el title en 1 h1', () => {
    render(<App title={title} initCounter={initCounter} />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      title
    );
  });

  test('should return value', () => {
    render(<App title={title} initCounter={initCounter} />);

    // expect(screen.getByText(initCounter)).toContain(initCounter);
  });
});
