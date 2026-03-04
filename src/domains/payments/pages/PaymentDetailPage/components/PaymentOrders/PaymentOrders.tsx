import type { Order } from '@/domains/payments/types/payment';
import { SectionCard } from '@/shared/components/SectionCard/SectionCard';
import { formatDate } from '@/shared/utils/format/format';

interface Props {
  orders: Order[];
}

export const PaymentOrders = ({ orders }: Props) => {
  if (orders.length === 0) return null;

  return (
    <SectionCard>
      <h3 className="font-semibold">Orders</h3>
      <ul className="text-sm">
        {orders.map((o) => (
          <li key={o.id}>
            <span className="text-gray-500">Ref:</span> {o.merchant_reference}{' '}
            <span className="text-gray-400">({formatDate(o.created)})</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};
