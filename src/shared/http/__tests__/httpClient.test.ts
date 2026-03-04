import { afterEach, describe, expect, it, vi } from 'vitest';
import { createHttpClient } from '../httpClient';
import { HttpError } from '../HttpError';

const BASE_URL = 'http://localhost:3001';

function makeFetch(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('createHttpClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed JSON on a 200 response', async () => {
    vi.stubGlobal('fetch', makeFetch(200, { id: '42' }));

    const client = createHttpClient(BASE_URL);
    const result = await client.get<{ id: string }>('/payments');

    expect(result).toEqual({ id: '42' });
  });

  it('builds the full URL from baseUrl + path', async () => {
    const fetchMock = makeFetch(200, {});
    vi.stubGlobal('fetch', fetchMock);

    const client = createHttpClient(BASE_URL);
    await client.get('/payment');

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/payment`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('throws HttpError with status 404 on a not-found response', async () => {
    vi.stubGlobal('fetch', makeFetch(404, null));

    const client = createHttpClient(BASE_URL);
    await expect(client.get('/payment/unknown')).rejects.toThrow(HttpError);
    await expect(client.get('/payment/unknown')).rejects.toMatchObject({
      status: 404,
    });
  });

  it('throws HttpError with status 500 on a server error', async () => {
    vi.stubGlobal('fetch', makeFetch(500, null));

    const client = createHttpClient(BASE_URL);
    await expect(client.get('/payment')).rejects.toThrow(HttpError);
    await expect(client.get('/payment')).rejects.toMatchObject({ status: 500 });
  });

  it('wraps network errors into HttpError with status 0', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    );

    const client = createHttpClient(BASE_URL);
    await expect(client.get('/payment')).rejects.toThrow(HttpError);
    await expect(client.get('/payment')).rejects.toMatchObject({ status: 0 });
  });

  it('wraps JSON parse errors into HttpError with status 0', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.reject(new SyntaxError('Unexpected token')),
      }),
    );

    const client = createHttpClient(BASE_URL);
    await expect(client.get('/payment')).rejects.toThrow(HttpError);
    await expect(client.get('/payment')).rejects.toMatchObject({ status: 0 });
  });
});
