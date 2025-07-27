// __tests__/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom';


describe('Navbar', () => {
  it('renders the SimplerTech brand name', () => {
    render(<Navbar />);
    const brand = screen.getByText('SimplerTech');
    expect(brand).toBeInTheDocument();
  });

  it('has 3 navigation links', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
