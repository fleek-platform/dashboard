/**
 * Formats a number into a currency string.
 *
 * @param value - The numeric value to format.
 * @param currency - The currency code (e.g., 'USD', 'EUR'). Defaults to 'USD'.
 * @param locale - The locale string (e.g., 'en-US', 'de-DE'). Defaults to 'navigator.language' or 'en-US'.
 * @returns The formatted currency string.
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = navigator.language,
): string {
  return new Intl.NumberFormat(locale || 'en-US', {
    style: 'currency',
    currency,
  }).format(value);
}
