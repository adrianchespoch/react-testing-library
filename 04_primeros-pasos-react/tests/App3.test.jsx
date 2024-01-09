import { fireEvent, render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Pruebas sobre el counter', () => {
  const title = 'React';
  const initCounter = 10;

  test('should match con el snapshot', () => {
    const { container } = render(
      <App title={title} initCounter={initCounter} />
    );

    expect(container).toMatchSnapshot();
  });

  test('should return 100', () => {
    render(<App title={title} initCounter={initCounter} />);

    expect(screen.getByText(initCounter)).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(
      String(initCounter)
    );
  });

  test('should increase with +1 btn', () => {
    render(<App title={title} initCounter={initCounter} />);

    // eventos
    fireEvent.click(screen.getByText('+1'));

    expect(screen.getByText('11')).toBeTruthy();
  });

  test('should decrementar con el btn -1', () => {
    render(<App title={title} initCounter={initCounter} />);

    fireEvent.click(screen.getByText('-1'));
    // screen.debug();

    expect(screen.getByText('9')).toBeTruthy();
  });

  test('should reset', () => {
    render(<App title={title} initCounter={initCounter} />);

    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('+1'));

    fireEvent.click(screen.getByText('-1'));
    // screen.debug();

    // // // aria-label="btn-reset"   <-  HTML
    // fireEvent.click(screen.getByText('Reset'));
    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }));

    expect(screen.getByText('10')).toBeTruthy();
  });
});
