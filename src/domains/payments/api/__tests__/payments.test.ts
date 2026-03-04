import { describe, expect, it, vi } from 'vitest';
import { buildPaymentDetail } from '@/domains/payments/testing/builders';
import { apiClient } from '@/shared/http/httpClient';
import type { PaymentsListResponse } from '../../types/payment';
import { fetchPaymentDetail, fetchPayments } from '../payments';

vi.mock('@/shared/http/httpClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);

describe('payments API', () => {
  it('fetches the list of payments', async () => {
    const mockResponse: PaymentsListResponse = {
      total_amount_left_to_pay: 10000,
      payments: [],
    };
    mockedGet.mockResolvedValue(mockResponse);

    const result = await fetchPayments();

    expect(mockedGet).toHaveBeenCalledWith('/payments');
    expect(result).toEqual(mockResponse);
  });

  it('fetches the payment detail', async () => {
    const mockDetail = buildPaymentDetail({ id: 'pay_123' });
    mockedGet.mockResolvedValue(mockDetail);

    const result = await fetchPaymentDetail('pay_123');

    expect(mockedGet).toHaveBeenCalledWith('/payment/pay_123');
    expect(result).toEqual(mockDetail);
  });
});
