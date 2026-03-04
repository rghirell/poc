import { HttpError } from './HttpError';

export interface HttpClient {
  get: <T>(path: string) => Promise<T>;
}

export function createHttpClient(baseUrl: string): HttpClient {
  return {
    get: async <T>(path: string): Promise<T> => {
      const url = `${baseUrl}${path}`;
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
        if (!res.ok) throw new HttpError(res.status, url);
        return (await res.json()) as T;
      } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError(0, url);
      }
    },
  };
}

export const apiClient = createHttpClient(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
);
