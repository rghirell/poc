const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatCents(cents: number): string {
  return currencyFormatter.format(cents / 100);
}

export function formatDate(timestamp: number): string {
  return dateFormatter.format(new Date(timestamp * 1000));
}
