import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { server } from '@/testing/mswServer';
import { PaymentDetailPage } from '../PaymentDetailPage';

function renderWithRoute(paymentId = 'payment_1') {
  const QueryWrapper = createTestQueryWrapper();
  return render(
    <QueryWrapper>
      <MemoryRouter initialEntries={[`/payment/${paymentId}`]}>
        <Routes>
          <Route path="/payment/:id" element={<PaymentDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryWrapper>,
  );
}

describe('PaymentDetailPage (integration)', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it('should show loading state while fetching', () => {
    server.use(
      http.get('http://localhost:3001/payment/:id', () => {
        return new Promise(() => undefined);
      }),
    );

    renderWithRoute();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render payment detail with all sections', async () => {
    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByTestId('installment-section')).toBeInTheDocument();
    });
    // Summary
    expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    // Card info
    expect(screen.getByText(/\*\*\*\*0003/)).toBeInTheDocument();
    // Orders
    expect(screen.getByText(/ref-123/)).toBeInTheDocument();
    // Fees
    expect(screen.getAllByText(/3,78/).length).toBeGreaterThanOrEqual(1);
    // Installment states
    expect(screen.getByText('paid')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    // Back link
    expect(screen.getByRole('link', { name: /Back to list/ })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('should show error state on 500 response', async () => {
    server.use(
      http.get('http://localhost:3001/payment/:id', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithRoute();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });
});
