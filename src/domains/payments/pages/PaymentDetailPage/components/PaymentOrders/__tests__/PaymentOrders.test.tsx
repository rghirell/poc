import { render, screen } from '@testing-library/react';
import { buildOrder } from '@/domains/payments/testing/builders';
import { PaymentOrders } from '../PaymentOrders';

const mockOrders = [
  buildOrder(),
  buildOrder({ id: 'order_2', merchant_reference: 'ref-456' }),
];

describe('PaymentOrders', () => {
  it('should render all order references', () => {
    render(<PaymentOrders orders={mockOrders} />);
    expect(screen.getByText(/ref-123/)).toBeInTheDocument();
    expect(screen.getByText(/ref-456/)).toBeInTheDocument();
  });

  it('should render the order date', () => {
    render(<PaymentOrders orders={mockOrders} />);
    expect(screen.getAllByText(/03\/07\/2025/).length).toBeGreaterThan(0);
  });

  it('should render nothing when orders list is empty', () => {
    const { container } = render(<PaymentOrders orders={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
