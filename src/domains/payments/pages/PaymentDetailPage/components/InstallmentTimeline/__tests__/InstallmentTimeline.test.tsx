import { render, screen } from '@testing-library/react';
import { buildInstallmentDetail } from '@/domains/payments/testing/builders';
import { InstallmentTimeline } from '../InstallmentTimeline';

const mockInstallments = [
  buildInstallmentDetail({
    date_paid: 1751527335,
    state: 'paid',
    customer_fee: 378,
    used_payment_method: 'card',
  }),
  buildInstallmentDetail({
    id: 'inst_2',
    due_date: 1754205697,
    state: 'pending',
    customer_can_postpone_until: '2025-09-03',
  }),
];

describe('InstallmentTimeline', () => {
  it('should render the table headers', () => {
    render(<InstallmentTimeline installments={mockInstallments} />);
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Due date')).toBeInTheDocument();
    expect(screen.getByText('Paid on')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Fees')).toBeInTheDocument();
  });

  it('should render a row for each installment', () => {
    render(<InstallmentTimeline installments={mockInstallments} />);
    const rows = screen.getAllByRole('row');
    // 1 header row + 2 data rows
    expect(rows).toHaveLength(3);
  });

  it('should display installment states', () => {
    render(<InstallmentTimeline installments={mockInstallments} />);
    expect(screen.getByText('paid')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });
});
