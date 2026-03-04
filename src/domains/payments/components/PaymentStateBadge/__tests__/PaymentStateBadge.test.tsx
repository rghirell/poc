import { render, screen } from '@testing-library/react';
import { PaymentStateBadge } from '../PaymentStateBadge';

describe('PaymentStateBadge', () => {
  it('renders "In Progress" for in_progress state', () => {
    render(<PaymentStateBadge state="in_progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders "Late" for late state', () => {
    render(<PaymentStateBadge state="late" />);
    expect(screen.getByText('Late')).toBeInTheDocument();
  });

  it('renders "Completed" for completed state', () => {
    render(<PaymentStateBadge state="completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
