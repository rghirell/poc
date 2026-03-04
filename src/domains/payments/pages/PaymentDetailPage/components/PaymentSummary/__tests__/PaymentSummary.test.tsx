import { render, screen } from '@testing-library/react';
import { buildPaymentDetail } from '@/domains/payments/testing/builders';
import { PaymentSummary } from '../PaymentSummary';

const payment = buildPaymentDetail();

describe('PaymentSummary', () => {
  it('should render the merchant name', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText('Test Merchant')).toBeInTheDocument();
  });

  it('should render the different sections', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText('Total amount')).toBeInTheDocument();
    expect(screen.getByText('Amount left to pay')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('should render the payment state badge', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should render the total purchase amount', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText(/210,00\s€/)).toBeInTheDocument();
  });

  it('should render the amount left to pay', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText(/157,50\s€/)).toBeInTheDocument();
  });

  it('should render the creation date', () => {
    render(<PaymentSummary payment={payment} />);
    expect(screen.getByText(/03\/07\/2025/)).toBeInTheDocument();
  });
});
