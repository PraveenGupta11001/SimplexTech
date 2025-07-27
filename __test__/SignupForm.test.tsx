import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '@/components/forms/SignupForm';

describe('SignupForm', () => {
  it('renders form fields correctly', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid email required/i)).toBeInTheDocument();
    expect(screen.getByText(/Min 6 characters/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', () => {
    render(<SignupForm />);
  
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Praveen Gupta' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'praveen@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'strongpass' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
  
    expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Valid email required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Min 6 characters/i)).not.toBeInTheDocument();
  });

  it('shows email format error', () => {
    render(<SignupForm />);
  
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'invalidemail' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(screen.getByText(/Valid email required/i)).toBeInTheDocument();
  });

  it('shows error if password is less than 6 characters', () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(screen.getByText(/Min 6 characters/i)).toBeInTheDocument();
  });
  
  
  
});
