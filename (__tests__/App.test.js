import { render, screen } from '@testing-library/react';
import App from '../src/App'; // Se till att du importerar komponenten korrekt

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
