import { MAX_QUERY_LENGTH } from './constants.js';

/**
 * Sanitize a search query for use in a filename
 * Removes special characters and replaces spaces with dashes
 */
export function sanitizeQueryForFilename(query: string): string {
  // Convert to lowercase and replace non-alphanumeric chars with dashes
  let sanitized = query.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Remove leading/trailing dashes
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  // Truncate if too long
  if (sanitized.length > MAX_QUERY_LENGTH) {
    sanitized = sanitized.slice(0, MAX_QUERY_LENGTH);
    // Remove trailing dash if truncation created one
    sanitized = sanitized.replace(/-+$/, '');
  }

  return sanitized;
}

/**
 * Format a date to YYYY-MM-DD-HH-MM-SS format for filenames
 */
export function formatTimestampForFilename(date: Date): string {
  return date
    .toISOString()
    .slice(0, 19)
    .replace('T', '-')
    .replace(/:/g, '-');
}

/**
 * Generate a filename for crawl results
 */
export function generateResultsFilename(query: string): string {
  const timestamp = formatTimestampForFilename(new Date());
  const sanitizedQuery = sanitizeQueryForFilename(query);
  return `${timestamp}-${sanitizedQuery}.md`;
}
