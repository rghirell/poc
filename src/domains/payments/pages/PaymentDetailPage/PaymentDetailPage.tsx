import { Link, useParams } from 'react-router-dom';
import { usePaymentDetail } from '@/domains/payments/hooks/usePaymentDetail';
import { InstallmentSection } from './components/InstallmentSection/InstallmentSection';
import { PaymentCardInfo } from './components/PaymentCardInfo/PaymentCardInfo';
import { PaymentFees } from './components/PaymentFees/PaymentFees';
import { PaymentOrders } from './components/PaymentOrders/PaymentOrders';
import { PaymentSummary } from './components/PaymentSummary/PaymentSummary';

export const PaymentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: payment, error, isPending } = usePaymentDetail(id ?? '');

  if (isPending) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">Something went wrong...</p>;

  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to list
      </Link>

      <PaymentSummary payment={payment} />
      <PaymentCardInfo card={payment.customer.card} />
      <PaymentOrders orders={payment.orders} />
      <PaymentFees fees={payment.fees} />
      <InstallmentSection installments={payment.payment_plan} />
    </div>
  );
};
