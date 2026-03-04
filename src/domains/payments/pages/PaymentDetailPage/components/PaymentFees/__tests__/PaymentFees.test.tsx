import { render, screen } from '@testing-library/react';
import { buildFees } from '@/domains/payments/testing/builders';
import { PaymentFees } from '../PaymentFees';

const mockFees = buildFees();

describe('PaymentFees', () => {
  it('should render the section labels', () => {
    render(<PaymentFees fees={mockFees} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Excl. tax')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
  });
  it('should render the total fee', () => {
    render(<PaymentFees fees={mockFees} />);
    expect(screen.getByText(/3,78\s€/)).toBeInTheDocument();
  });

  it('should render the fee excluding tax', () => {
    render(<PaymentFees fees={mockFees} />);
    expect(screen.getByText(/3,15\s€/)).toBeInTheDocument();
  });

  it('should render the tax amount', () => {
    render(<PaymentFees fees={mockFees} />);
    expect(screen.getByText(/0,63\s€/)).toBeInTheDocument();
  });
});
