import { PaymentStateBadge } from '@/domains/payments/components/PaymentStateBadge/PaymentStateBadge';
import type { PaymentDetail } from '@/domains/payments/types/payment';
import { SectionCard } from '@/shared/components/SectionCard/SectionCard';
import { formatCents, formatDate } from '@/shared/utils/format/format';

interface Props {
  payment: PaymentDetail;
}

export const PaymentSummary = ({ payment }: Props) => (
  <SectionCard className="gap-4">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold">{payment.merchant_display_name}</h2>
      <PaymentStateBadge state={payment.state} />
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4">
      <div>
        <span className="text-gray-500">Total amount</span>
        <p className="font-semibold">{formatCents(payment.purchase_amount)}</p>
      </div>
      <div>
        <span className="text-gray-500">Amount left to pay</span>
        <p className="font-semibold">
          {formatCents(payment.amount_left_to_pay)}
        </p>
      </div>
      <div>
        <span className="text-gray-500">Created</span>
        <p>{formatDate(payment.created)}</p>
      </div>
    </div>
  </SectionCard>
);
