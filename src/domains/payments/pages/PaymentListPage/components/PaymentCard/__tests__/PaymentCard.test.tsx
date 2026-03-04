import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  buildInstallment,
  buildPaymentListItem,
} from '@/domains/payments/testing/builders';
import { PaymentCard } from '../PaymentCard';

const mockPayment = buildPaymentListItem({
  payment_plan: [
    buildInstallment(),
    buildInstallment({ id: 'inst_2', due_date: 1754205697 }),
  ],
});

function renderCard(payment = mockPayment) {
  return render(
    <MemoryRouter>
      <PaymentCard payment={payment} />
    </MemoryRouter>,
  );
}

describe('PaymentCard', () => {
  it('should render the merchant name', () => {
    renderCard();
    expect(screen.getByText('Test Merchant')).toBeInTheDocument();
  });

  it('should render the formatted purchase amount', () => {
    renderCard();
    expect(screen.getByText(/210,00\s€/)).toBeInTheDocument();
  });

  it('should render the installment count', () => {
    renderCard();
    expect(screen.getByText(/2 installments/)).toBeInTheDocument();
  });

  it('should render the creation date', () => {
    renderCard();
    expect(screen.getByText(/03\/07\/2025/)).toBeInTheDocument();
  });

  it('should render the payment state badge', () => {
    renderCard();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should link to the payment detail page', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/payment/payment_1',
    );
  });

  it('should render the logo when logo_url is provided', () => {
    renderCard(
      buildPaymentListItem({ logo_url: 'https://example.com/logo.png' }),
    );
    expect(screen.getByTestId('merchant-logo')).toHaveAttribute(
      'src',
      'https://example.com/logo.png',
    );
  });

  it('should not render an image when logo_url is null', () => {
    renderCard();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
