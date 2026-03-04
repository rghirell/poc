import { useQuery } from '@tanstack/react-query';
import { fetchPayments } from '../api/payments';
import { paymentKeys } from './queryKeys';

export const usePayments = () =>
  useQuery({ queryKey: paymentKeys.all, queryFn: fetchPayments });
