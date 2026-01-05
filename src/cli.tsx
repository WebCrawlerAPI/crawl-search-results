import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import { getApiKey, setApiKey, hasApiKey } from './storage/config.js';
import { crawlGoogleSearch } from './api/crawler.js';
import { saveResults } from './storage/results.js';
import { DASHBOARD_URL } from './utils/constants.js';

interface CLIProps {
  query: string;
}

type State =
  | { type: 'need_api_key' }
  | { type: 'crawling' }
  | { type: 'success'; filePath: string }
  | { type: 'error'; message: string };

export const CLI: React.FC<CLIProps> = ({ query }) => {
  const [state, setState] = useState<State>(
    hasApiKey() ? { type: 'crawling' } : { type: 'need_api_key' }
  );
  const [apiKeyInput, setApiKeyInput] = useState('');

  // Handle API key submission
  const handleApiKeySubmit = (value: string) => {
    if (value.trim()) {
      setApiKey(value.trim());
      setState({ type: 'crawling' });
    }
  };

  // Handle crawling
  useEffect(() => {
    if (state.type !== 'crawling') return;

    const performCrawl = async () => {
      try {
        const apiKey = getApiKey();
        if (!apiKey) {
          setState({
            type: 'error',
            message: 'No API key found. Please restart and provide your API key.',
          });
          return;
        }

        const job = await crawlGoogleSearch(query, apiKey);
        const filePath = await saveResults(job, query);

        setState({ type: 'success', filePath });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';

        // Provide user-friendly error messages
        let friendlyMessage = errorMessage;
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
          friendlyMessage = `Invalid API key. Please check your key at:\n${DASHBOARD_URL}`;
        } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
          friendlyMessage = 'API rate limit exceeded. Please wait a moment and try again.';
        } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('network')) {
          friendlyMessage = 'Failed to connect to WebCrawlerAPI. Please check your internet connection.';
        }

        setState({ type: 'error', message: friendlyMessage });
      }
    };

    performCrawl();
  }, [state, query]);

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box borderStyle="double" borderColor="cyan" paddingX={2} paddingY={1}>
        <Text bold color="cyan">
          Google Search Results Downloader (WebCrawlerAPI)
        </Text>
      </Box>

      <Box marginY={1} />

      {/* API Key Input State */}
      {state.type === 'need_api_key' && (
        <Box flexDirection="column">
          <Box>
            <Text color="yellow">No API key found.</Text>
          </Box>
          <Box marginTop={1}>
            <Text>Get your free API key at:</Text>
          </Box>
          <Box>
            <Text color="blue" underline>
              {DASHBOARD_URL}
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text>Enter your API key: </Text>
            <TextInput
              value={apiKeyInput}
              onChange={setApiKeyInput}
              onSubmit={handleApiKeySubmit}
            />
          </Box>
        </Box>
      )}

      {/* Crawling State */}
      {state.type === 'crawling' && (
        <Box flexDirection="column">
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text> Crawling Google search results for "{query}"...</Text>
          </Box>
          <Box marginTop={1}>
            <Text dimColor>
              This may take a few moments as we crawl up to 10 search results.
            </Text>
          </Box>
        </Box>
      )}

      {/* Success State */}
      {state.type === 'success' && (
        <Box flexDirection="column">
          <Box>
            <Text color="green" bold>
              Successfully crawled 10 results!
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text>Saved to: </Text>
            <Text color="cyan">{state.filePath}</Text>
          </Box>
        </Box>
      )}

      {/* Error State */}
      {state.type === 'error' && (
        <Box flexDirection="column">
          <Box>
            <Text color="red" bold>
              Error:
            </Text>
            <Text> {state.message}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
