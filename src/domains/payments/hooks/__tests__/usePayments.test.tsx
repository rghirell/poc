import { renderHook, waitFor } from '@testing-library/react';
import * as api from '@/domains/payments/api/payments';
import { buildPaymentsListResponse } from '@/domains/payments/testing/builders';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { usePayments } from '../usePayments';

vi.mock('@/domains/payments/api/payments');
const mockedFetchPayments = vi.mocked(api.fetchPayments);

const wrapper = createTestQueryWrapper();

const mockResponse = buildPaymentsListResponse({
  total_amount_left_to_pay: 10000,
  payments: [],
});

describe('usePayments', () => {
  it('returns data on success', async () => {
    mockedFetchPayments.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePayments(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockResponse);
  });

  it('returns error on failure', async () => {
    mockedFetchPayments.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePayments(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error?.message).toBe('Network error');
  });
});
