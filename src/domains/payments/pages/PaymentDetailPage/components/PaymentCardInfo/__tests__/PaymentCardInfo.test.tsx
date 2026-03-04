import { render, screen } from '@testing-library/react';
import { buildCard } from '@/domains/payments/testing/builders';
import { PaymentCardInfo } from '../PaymentCardInfo';

const mockCard = buildCard();

describe('PaymentCardInfo', () => {
  it('should render the card brand', () => {
    render(<PaymentCardInfo card={mockCard} />);
    expect(screen.getByText(/visa/i)).toBeInTheDocument();
  });

  it('should render the last 4 digits', () => {
    render(<PaymentCardInfo card={mockCard} />);
    expect(screen.getByText(/\*\*\*\*0003/)).toBeInTheDocument();
  });

  it('should render the expiry date with zero-padded month', () => {
    render(<PaymentCardInfo card={mockCard} />);
    expect(screen.getByText(/01\/2030/)).toBeInTheDocument();
  });
});
