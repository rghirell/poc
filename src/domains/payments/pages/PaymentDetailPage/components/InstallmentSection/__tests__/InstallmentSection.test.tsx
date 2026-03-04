import { render, screen } from '@testing-library/react';
import { buildInstallmentDetail } from '@/domains/payments/testing/builders';
import { InstallmentSection } from '../InstallmentSection';

describe('InstallmentSection', () => {
  it('should render the section title', () => {
    render(<InstallmentSection installments={[]} />);
    expect(screen.getByText('Installments')).toBeInTheDocument();
  });

  it('should render the installment timeline', () => {
    const installments = [
      buildInstallmentDetail({ state: 'paid' }),
      buildInstallmentDetail({ id: 'inst_2', state: 'pending' }),
    ];

    render(<InstallmentSection installments={installments} />);
    expect(screen.getByText('paid')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });
});
