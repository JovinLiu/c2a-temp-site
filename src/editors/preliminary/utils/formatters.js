export function formatCurrency(value) {
  if (value === '' || value === null || value === undefined) {
    return '[Insert amount]';
  }

  const number = Number(String(value).replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(number)) return String(value);

  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function safeFileName(value) {
  return String(value || 'Template')
    .trim()
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '') || 'Template';
}
