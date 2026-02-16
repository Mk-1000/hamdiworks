/**
 * Normalize a hex color for storage and display.
 * Ensures 6-digit hex has # prefix so color inputs and CSS work correctly.
 */
export function normalizeHex(s: string | undefined | null): string {
  if (s == null) return '';
  const t = String(s).trim();
  const match = t.match(/^#?([0-9A-Fa-f]{6})$/);
  if (match) return '#' + match[1].toLowerCase();
  return t;
}

/** Return a valid #rrggbb for HTML color input, or fallback if invalid. */
export function colorInputValue(
  value: string | undefined | null,
  fallback: string
): string {
  const normalized = normalizeHex(value);
  return normalized.length === 7 && normalized.startsWith('#') ? normalized : fallback;
}
