export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
  ) {
    super(`HTTP ${String(status)} on ${url}`);
    this.name = 'HttpError';
  }
}
