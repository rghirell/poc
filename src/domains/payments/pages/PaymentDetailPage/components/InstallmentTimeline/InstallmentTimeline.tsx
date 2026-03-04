import type {
  InstallmentDetail,
  InstallmentState,
} from '@/domains/payments/types/payment';
import { formatCents, formatDate } from '@/shared/utils/format/format';

const stateColors: Record<InstallmentState, string> = {
  paid: 'text-green-700',
  pending: 'text-gray-600',
  late: 'text-red-700',
};

export const InstallmentTimeline = ({
  installments,
}: {
  installments: InstallmentDetail[];
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500">
          <th className="py-2 pr-4">#</th>
          <th className="py-2 pr-4">Amount</th>
          <th className="py-2 pr-4">Due date</th>
          <th className="py-2 pr-4">Paid on</th>
          <th className="py-2 pr-4">Status</th>
          <th className="py-2">Fees</th>
        </tr>
      </thead>
      <tbody>
        {installments.map((inst, i) => (
          <tr key={inst.id} className="border-b border-gray-100">
            <td className="py-2 pr-4">{i + 1}</td>
            <td className="py-2 pr-4">{formatCents(inst.purchase_amount)}</td>
            <td className="py-2 pr-4">{formatDate(inst.due_date)}</td>
            <td className="py-2 pr-4">
              {inst.date_paid ? formatDate(inst.date_paid) : '—'}
            </td>
            <td className={`py-2 pr-4 font-medium ${stateColors[inst.state]}`}>
              {inst.state}
            </td>
            <td className="py-2">
              {inst.customer_fee > 0 ? formatCents(inst.customer_fee) : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
