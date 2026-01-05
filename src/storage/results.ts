import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import type { Job, JobItem } from 'webcrawlerapi-js';
import { STORAGE_DIR } from '../utils/constants.js';
import { generateResultsFilename } from '../utils/formatter.js';

/**
 * Ensure the storage directory exists
 */
async function ensureStorageDirectory(): Promise<string> {
  const storageDir = resolve(process.cwd(), STORAGE_DIR);

  if (!existsSync(storageDir)) {
    await mkdir(storageDir, { recursive: true });
  }

  return storageDir;
}

/**
 * Format a single job item as markdown
 */
async function formatJobItem(item: JobItem, index: number): Promise<string> {
  const content = await item.getContent();

  return `## Result ${index + 1}: ${item.title || 'Untitled'}
**URL:** ${item.original_url}
**Status Code:** ${item.page_status_code}
**Depth:** ${item.depth ?? 'N/A'}

${content || '_No content available_'}

---
`;
}

/**
 * Format the entire job as markdown
 */
async function formatJobAsMarkdown(job: Job, query: string): Promise<string> {
  const header = `# Google Search Results: ${query}

**Crawled at:** ${new Date().toISOString()}
**Items found:** ${job.job_items.length}
**WebCrawlerAPI Job ID:** ${job.id}

---

`;

  const itemsPromises = job.job_items.map((item, index) =>
    formatJobItem(item, index)
  );
  const items = await Promise.all(itemsPromises);

  return header + items.join('\n');
}

/**
 * Save crawl results to a markdown file
 * Returns the absolute path to the saved file
 */
export async function saveResults(
  job: Job,
  query: string
): Promise<string> {
  const storageDir = await ensureStorageDirectory();
  const filename = generateResultsFilename(query);
  const filepath = join(storageDir, filename);

  const markdown = await formatJobAsMarkdown(job, query);
  await writeFile(filepath, markdown, 'utf-8');

  return filepath;
}
