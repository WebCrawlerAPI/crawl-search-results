# Crawl Search Results

A CLI tool to download and save Google search results using WebCrawlerAPI. Get full content from the top 10 search results and save them as markdown files.

## Requirements

- Node.js 18 or higher
- [WebCrawlerAPI](https://webcrawlerapi.com) account (free trial available)

## How It Works

1. Takes your search query as input
2. Constructs a Google search URL
3. Uses WebCrawlerAPI to crawl the search page and follow up to 10 result links
4. Downloads full markdown content from each linked website
5. Saves all results in a single organized markdown file

## Installation

### Quick Start with bunx (No Installation)

```bash
bunx crawl-search-results "your search query"
```

### Global Installation

```bash
npm install -g crawl-search-results
# or
pnpm add -g crawl-search-results
```

## Usage

### First Run

On your first run, you'll be prompted to enter your WebCrawlerAPI key:

```bash
$ crawl-search-results "webscraping guide"

╔════════════════════════════════════════════════════════════╗
║  Google Search Results Downloader (WebCrawlerAPI)         ║
╚════════════════════════════════════════════════════════════╝

⚠️  No API key found.

Get your free API key at:
🔗 https://app.webcrawlerapi.com/dashboard

Enter your API key: [paste your key here]
✓ API key saved!

⠋ Crawling Google search results for "webscraping guide"...
This may take a few moments as we crawl up to 10 search results.

✓ Successfully crawled 10 results!
📄 Saved to: .webcrawlera/2025-01-05-14-30-45-webscraping-guide.md
```

### Subsequent Runs

After the first run, the tool will use your saved API key:

```bash
$ crawl-search-results "best practices"

╔════════════════════════════════════════════════════════════╗
║  Google Search Results Downloader (WebCrawlerAPI)         ║
╚════════════════════════════════════════════════════════════╝

⠋ Crawling Google search results for "best practices"...
This may take a few moments as we crawl up to 10 search results.

✓ Successfully crawled 10 results!
📄 Saved to: .webcrawlerapi/2025-01-05-14-35-22-best-practices.md
```

## Output Format

Results are saved in the `.webcrawlerapi/` directory with the following naming format:

```
.webcrawlerapi/YYYY-MM-DD-HH-MM-SS-query.md
```

Example:
```
.webcrawlerapi/2025-01-05-14-30-45-webscraping-guide.md
```

Each markdown file contains:
- Metadata (crawl timestamp, job ID, number of items)
- Full content from each of the 10 search results
- URL, status code, and depth information for each result

## API Key

You need a WebCrawlerAPI key to use this tool. Get your free API key at:

**https://app.webcrawlerapi.com/dashboard**

Your API key is stored securely in your home directory:
- macOS/Linux: `~/.config/crawl-search-results/config.json`
- Windows: `%APPDATA%\crawl-search-results\config.json`

## Examples

```bash
# Search for webscraping guides
crawl-search-results "webscraping guide"

# Search for best practices
crawl-search-results "best practices"

# Search with multiple words
crawl-search-results "how to build a REST API"

# Use with bunx (no installation)
bunx crawl-search-results "TypeScript tips"
```

## Troubleshooting

### Invalid API Key
```
❌ Error: Invalid API key. Please check your key at:
🔗 https://dash.webcrawlerapi.com/access
```
**Solution:** Verify your API key at the dashboard and run the command again.

### Rate Limit Exceeded
```
❌ Error: API rate limit exceeded.
Please wait a moment and try again.
```
**Solution:** Wait a few moments before making another request.

### Network Connection Issues
```
❌ Error: Failed to connect to WebCrawlerAPI.
Please check your internet connection.
```
**Solution:** Check your internet connection and try again.

## License

MIT

## Support

For issues and questions:
- WebCrawlerAPI Documentation: https://webcrawlerapi.com/docs
- WebCrawlerAPI Dashboard: https://app.webcrawlerapi.com/dashboard
