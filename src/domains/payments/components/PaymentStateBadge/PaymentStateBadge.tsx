import type { PaymentState } from '../../types/payment';

const config: Record<PaymentState, { color: string; label: string }> = {
  in_progress: { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  late: { color: 'bg-red-100 text-red-800', label: 'Late' },
  completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
};

export const PaymentStateBadge = ({ state }: { state: PaymentState }) => {
  const { color, label } = config[state];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium text-center ${color}`}
    >
      {label}
    </span>
  );
};
