import type { InstallmentDetail } from '@/domains/payments/types/payment';
import { SectionCard } from '@/shared/components/SectionCard/SectionCard';
import { InstallmentTimeline } from '../InstallmentTimeline/InstallmentTimeline';

interface InstallmentSectionProps {
  installments: InstallmentDetail[];
}

export const InstallmentSection = ({
  installments,
}: InstallmentSectionProps) => (
  <SectionCard data-testid="installment-section">
    <h3 className="font-semibold">Installments</h3>
    <InstallmentTimeline installments={installments} />
  </SectionCard>
);
