import type { Card } from '@/domains/payments/types/payment';
import { SectionCard } from '@/shared/components/SectionCard/SectionCard';

interface Props {
  card: Card;
}

export const PaymentCardInfo = ({ card }: Props) => (
  <SectionCard>
    <h3 className="font-semibold">Card</h3>
    <p className="text-sm">
      <span className="uppercase font-medium">{card.brand}</span> ****
      {card.last4} - Exp. {String(card.exp_month).padStart(2, '0')}/
      {card.exp_year}
    </p>
  </SectionCard>
);
