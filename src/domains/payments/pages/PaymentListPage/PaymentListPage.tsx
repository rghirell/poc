import { usePayments } from '@/domains/payments/hooks/usePayments';
import { PaymentList } from './components/PaymentList/PaymentList';
import { TotalAmountSummary } from './components/TotalAmountSummary/TotalAmountSummary';

export const PaymentListPage = () => {
  const { data, error, isPending } = usePayments();

  if (isPending) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">Something went wrong...</p>;

  return (
    <div className="flex flex-col gap-6">
      <TotalAmountSummary
        totalAmountLeftToPay={data.total_amount_left_to_pay}
      />
      <PaymentList payments={data.payments} />
    </div>
  );
};
