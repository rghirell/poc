import { render, screen } from '@testing-library/react';
import { TotalAmountSummary } from '../TotalAmountSummary';

describe('TotalAmountSummary', () => {
  it('should render the label', () => {
    render(<TotalAmountSummary totalAmountLeftToPay={21000} />);
    expect(screen.getByText('Total amount left to pay')).toBeInTheDocument();
  });

  it('should format and display the amount in euros', () => {
    render(<TotalAmountSummary totalAmountLeftToPay={21000} />);
    expect(screen.getByText(/210,00\s€/)).toBeInTheDocument();
  });

  it('should render zero when the amount is zero', () => {
    render(<TotalAmountSummary totalAmountLeftToPay={0} />);
    expect(screen.getByText(/0,00\s€/)).toBeInTheDocument();
  });
});
