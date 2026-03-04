import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '@/domains/payments/api/payments';
import { buildPaymentDetail } from '@/domains/payments/testing/builders';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { PaymentDetailPage } from '../PaymentDetailPage';

vi.mock('@/domains/payments/api/payments');
const mockedFetchDetail = vi.mocked(api.fetchPaymentDetail);

const mockPayment = buildPaymentDetail();

function renderWithRoute() {
  const QueryWrapper = createTestQueryWrapper();
  return render(
    <QueryWrapper>
      <MemoryRouter initialEntries={['/payment/payment_1']}>
        <Routes>
          <Route path="/payment/:id" element={<PaymentDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryWrapper>,
  );
}

describe('PaymentDetailPage', () => {
  it('should show a loading state when the payment is loading', () => {
    renderWithRoute();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show an error message when the API fails', async () => {
    mockedFetchDetail.mockRejectedValue(new Error('Not found'));
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });

  it('should render the payment detail with installments', async () => {
    mockedFetchDetail.mockResolvedValue(mockPayment);
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByTestId('installment-section')).toBeInTheDocument();
    });
    expect(screen.getByText('paid')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('should render the card info', async () => {
    mockedFetchDetail.mockResolvedValue(mockPayment);
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByText(/\*\*\*\*0003/)).toBeInTheDocument();
    });
  });

  it('should render the orders', async () => {
    mockedFetchDetail.mockResolvedValue(mockPayment);
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByText(/ref-123/)).toBeInTheDocument();
    });
  });

  it('should render the back link', async () => {
    mockedFetchDetail.mockResolvedValue(mockPayment);
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByText(/Back to list/)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Back to list/ })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
