import { useQuery } from '@tanstack/react-query';
import { fetchPaymentDetail } from '../api/payments';
import { paymentKeys } from './queryKeys';

export const usePaymentDetail = (id: string) =>
  useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => fetchPaymentDetail(id),
    enabled: id.length > 0,
  });
