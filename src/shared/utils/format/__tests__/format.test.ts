import { formatCents, formatDate } from '../format';

describe('formatCents', () => {
  it('formats cents to EUR currency', () => {
    const result = formatCents(21000);
    expect(result).toMatch(/210,00\s€/);
  });

  it('formats zero', () => {
    const result = formatCents(0);
    expect(result).toMatch(/0,00\s€/);
  });

  it('formats small amounts', () => {
    const result = formatCents(50);
    expect(result).toMatch(/0,50\s€/);
  });
});

describe('formatDate', () => {
  it('formats a unix timestamp to fr-FR date', () => {
    const result = formatDate(1751527297);
    expect(result).toMatch(/03\/07\/2025/);
  });
});
