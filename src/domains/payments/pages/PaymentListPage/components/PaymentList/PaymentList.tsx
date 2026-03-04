import type { PaymentListItem } from '@/domains/payments/types/payment';
import { PaymentCard } from '../PaymentCard/PaymentCard';

interface PaymentListProps {
  payments: PaymentListItem[];
}

export const PaymentList = ({ payments }: PaymentListProps) => {
  if (payments.length === 0) {
    return <p className="text-gray-500">No payments found</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {payments.map((p) => (
        <PaymentCard key={p.id} payment={p} />
      ))}
    </div>
  );
};
