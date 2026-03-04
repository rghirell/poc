import { renderHook, waitFor } from '@testing-library/react';
import * as api from '@/domains/payments/api/payments';
import { buildPaymentDetail } from '@/domains/payments/testing/builders';
import { createTestQueryWrapper } from '@/domains/payments/testing/testQueryWrapper';
import { usePaymentDetail } from '../usePaymentDetail';

vi.mock('@/domains/payments/api/payments');
const mockedFetchDetail = vi.mocked(api.fetchPaymentDetail);

const wrapper = createTestQueryWrapper();

const mockDetail = buildPaymentDetail({ id: 'pay_123' });

describe('usePaymentDetail', () => {
  beforeEach(() => {
    mockedFetchDetail.mockClear();
  });

  it('returns data on success', async () => {
    mockedFetchDetail.mockResolvedValue(mockDetail);

    const { result } = renderHook(() => usePaymentDetail('pay_123'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockDetail);
    expect(mockedFetchDetail).toHaveBeenCalledWith('pay_123');
  });

  it('returns error on failure', async () => {
    mockedFetchDetail.mockRejectedValue(new Error('Not found'));

    const { result } = renderHook(() => usePaymentDetail('pay_123'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error?.message).toBe('Not found');
  });

  it('does not fetch when id is empty', async () => {
    const { result } = renderHook(() => usePaymentDetail(''), {
      wrapper: createTestQueryWrapper(),
    });

    await waitFor(() => {
      expect(result.current.fetchStatus).toBe('idle');
    });
    expect(mockedFetchDetail).not.toHaveBeenCalled();
  });
});
