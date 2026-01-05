import { WebcrawlerClient, type Job } from 'webcrawlerapi-js';
import { ITEMS_LIMIT, SCRAPE_TYPE } from '../utils/constants.js';

/**
 * Crawl Google search results for a given query
 * Returns a Job with up to 10 crawled items
 */
export async function crawlGoogleSearch(
  query: string,
  apiKey: string
): Promise<Job> {
  const client = new WebcrawlerClient(apiKey);

  // Construct Google search URL
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  // Crawl with item limit - API will follow links and return content
  const job = await client.crawl({
    url: searchUrl,
    items_limit: ITEMS_LIMIT,
    scrape_type: SCRAPE_TYPE,
  });

  return job;
}
