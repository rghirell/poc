import type { Fees } from '@/domains/payments/types/payment';
import { SectionCard } from '@/shared/components/SectionCard/SectionCard';
import { formatCents } from '@/shared/utils/format/format';

interface Props {
  fees: Fees;
}

export const PaymentFees = ({ fees }: Props) => (
  <SectionCard>
    <h3 className="font-semibold">Fees</h3>
    <div className="text-sm flex flex-row items-center justify-between text-center gap-4">
      <div>
        <span className="text-gray-500">Total</span>
        <p>{formatCents(fees.customer.total)}</p>
      </div>
      <div>
        <span className="text-gray-500">Excl. tax</span>
        <p>{formatCents(fees.customer.total_excluding_tax)}</p>
      </div>
      <div>
        <span className="text-gray-500">Tax</span>
        <p>{formatCents(fees.customer.tax)}</p>
      </div>
    </div>
  </SectionCard>
);
