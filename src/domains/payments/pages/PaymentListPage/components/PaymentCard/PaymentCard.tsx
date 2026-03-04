import { Link } from 'react-router-dom';
import { PaymentStateBadge } from '@/domains/payments/components/PaymentStateBadge/PaymentStateBadge';
import type { PaymentListItem } from '@/domains/payments/types/payment';
import { formatCents, formatDate } from '@/shared/utils/format/format';

interface Props {
  payment: PaymentListItem;
}

export const PaymentCard = ({ payment }: Props) => (
  <Link
    to={`/payment/${payment.id}`}
    className=" bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-400 text-gray-900"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {payment.logo_url && (
          <img
            src={payment.logo_url}
            alt=""
            className="w-8 h-8"
            data-testid="merchant-logo"
          />
        )}
        <div>
          <p className="font-medium">{payment.merchant_display_name}</p>
          <p className="text-sm text-gray-500">
            {payment.payment_plan.length} installments -&nbsp;
            {formatDate(payment.created)}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <PaymentStateBadge state={payment.state} />
        <span className="font-semibold">
          {formatCents(payment.purchase_amount)}
        </span>
      </div>
    </div>
  </Link>
);
