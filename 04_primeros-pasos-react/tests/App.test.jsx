/** @jest-environment jsdom */

import { getByText, render } from '@testing-library/react';
import App from '../src/App';

describe('Pruebas en App', () => {
  /* En production no cnoviene hacer el snapshot xq cambia
   test('Debe hacer match con el snapshot', () => {
    const { container } = render(<App title="React" initCounter={0} />);

    expect(container).toMatchSnapshot();
  }); */

  test('should return title', () => {
    const title = 'React';
    const { container, getByText, getByTestId } = render(
      <App title={title} initCounter={0} />
    );

    expect(getByText(title)).toBeTruthy();

    expect(getByTestId('test-title')).toBeTruthy();
    expect(getByTestId('test-title').innerHTML).toBe(title);

    // // No hacer esto: container es un node de js
    // const h1 = container.querySelector('h1');
    // expect(h1.innerHTML).toContain(title);
  });

  test('should mostar el valor enviado x props', () => {
    const title = 'React';
    const initCounter = 0;

    const { container, getByText, getByTestId } = render(
      <App title={title} initCounter={initCounter} />
    );

    
  });
});
