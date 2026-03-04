import { apiClient } from '@/shared/http/httpClient';
import type { PaymentDetail, PaymentsListResponse } from '../types/payment';

export const fetchPayments = (): Promise<PaymentsListResponse> =>
  apiClient.get<PaymentsListResponse>('/payments');

export const fetchPaymentDetail = (id: string): Promise<PaymentDetail> =>
  apiClient.get<PaymentDetail>(`/payment/${id}`);
