import { formatCents } from '@/shared/utils/format/format';

interface Props {
  totalAmountLeftToPay: number;
}

export const TotalAmountSummary = ({ totalAmountLeftToPay }: Props) => (
  <div className="p-4 bg-white rounded-lg border border-gray-200">
    <span className="text-gray-500 text-sm">Total amount left to pay</span>
    <p className="text-2xl font-bold text-gray-900">
      {formatCents(totalAmountLeftToPay)}
    </p>
  </div>
);
