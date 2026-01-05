import Conf from 'conf';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration storage for the CLI tool
 * Stores API key in local project directory
 */
const config = new Conf({
  projectName: 'crawl-search-results',
  cwd: path.join(__dirname, '../../'),
});

/**
 * Get the stored API key
 */
export function getApiKey(): string | undefined {
  return config.get('apiKey') as string | undefined;
}

/**
 * Save the API key to storage
 */
export function setApiKey(key: string): void {
  config.set('apiKey', key);
}

/**
 * Check if an API key is stored
 */
export function hasApiKey(): boolean {
  return config.has('apiKey');
}

/**
 * Delete the stored API key
 */
export function deleteApiKey(): void {
  config.delete('apiKey');
}
