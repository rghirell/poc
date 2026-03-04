import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as api from '@/domains/payments/api/payments';
import { buildPaymentsListResponse } from '@/domains/payments/testing/builders';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { PaymentListPage } from '../PaymentListPage';

vi.mock('@/domains/payments/api/payments');
const mockedFetchPayments = vi.mocked(api.fetchPayments);

function renderWithProviders() {
  const Wrapper = createTestQueryWrapper();
  return render(
    <Wrapper>
      <MemoryRouter>
        <PaymentListPage />
      </MemoryRouter>
    </Wrapper>,
  );
}

const mockResponse = buildPaymentsListResponse();

describe('PaymentListPage', () => {
  it('should show loading state', () => {
    mockedFetchPayments.mockReturnValue(new Promise(() => undefined));
    renderWithProviders();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the payment list', async () => {
    mockedFetchPayments.mockResolvedValue(mockResponse);

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should render a link to the payment detail', async () => {
    mockedFetchPayments.mockResolvedValue(mockResponse);

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    const link = screen.getByRole('link', { name: /Test Merchant/i });
    expect(link).toHaveAttribute('href', '/payment/payment_1');
  });

  it('should show an error message when the API fails', async () => {
    mockedFetchPayments.mockRejectedValue(new Error('Network error'));

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });

  it('should render an empty state when no payments', async () => {
    mockedFetchPayments.mockResolvedValue(
      buildPaymentsListResponse({ payments: [] }),
    );

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('No payments found')).toBeInTheDocument();
    });
  });
});
