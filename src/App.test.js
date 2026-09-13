import { render, screen } from '@testing-library/react';
import App from './App';

test('renders company name', () => {
  render(<App />);
  expect(screen.getByText(/Türkan Gıda ve Kimya Ürünleri/i)).toBeInTheDocument();
});
