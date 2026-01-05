#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import { CLI } from './cli.js';

const cli = meow(
  `
  Usage
    $ crawl-search-results <query>

  Examples
    $ crawl-search-results "webscraping guide"
    $ bunx crawl-search-results "best practices"

  Options
    --help     Show this help message
    --version  Show version number
`,
  {
    importMeta: import.meta,
    flags: {},
  }
);

// Get the query from the first argument
const query = cli.input.join(' ').trim();

if (!query) {
  cli.showHelp();
  process.exit(1);
}

// Render the CLI component
render(React.createElement(CLI, { query }));
