import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { buildPaymentsListResponse } from '@/domains/payments/testing/builders';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { server } from '@/testing/mswServer';
import { PaymentListPage } from '../PaymentListPage';

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

describe('PaymentListPage (integration)', () => {
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
      http.get('http://localhost:3001/payments', () => {
        return new Promise(() => undefined);
      }),
    );

    renderWithProviders();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the payment list with data from MSW', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Test Merchant/i });
    expect(link).toHaveAttribute('href', '/payment/payment_1');
  });

  it('should show error state on 500 response', async () => {
    server.use(
      http.get('http://localhost:3001/payments', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });

  it('should render empty state on empty payments array', async () => {
    server.use(
      http.get('http://localhost:3001/payments', () => {
        return HttpResponse.json(buildPaymentsListResponse({ payments: [] }));
      }),
    );

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('No payments found')).toBeInTheDocument();
    });
  });
});
