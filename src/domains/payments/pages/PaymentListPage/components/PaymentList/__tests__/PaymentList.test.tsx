import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { buildPaymentListItem } from '@/domains/payments/testing/builders';
import { PaymentList } from '../PaymentList';

function renderList(payments: Parameters<typeof PaymentList>[0]['payments']) {
  return render(
    <MemoryRouter>
      <PaymentList payments={payments} />
    </MemoryRouter>,
  );
}

describe('PaymentList', () => {
  it('should render a card for each payment', () => {
    const payments = [
      buildPaymentListItem({ id: 'p1', merchant_display_name: 'Merchant A' }),
      buildPaymentListItem({ id: 'p2', merchant_display_name: 'Merchant B' }),
    ];

    renderList(payments);

    expect(screen.getByText('Merchant A')).toBeInTheDocument();
    expect(screen.getByText('Merchant B')).toBeInTheDocument();
  });

  it('should show empty state when list is empty', () => {
    renderList([]);
    expect(screen.getByText('No payments found')).toBeInTheDocument();
  });
});
