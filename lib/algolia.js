import algoliasearch from 'algoliasearch/lite';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '';

let algoliaClient = null;

if (typeof window !== 'undefined') {
  if (!globalThis.__ALGOLIA_CLIENT__) {
    globalThis.__ALGOLIA_CLIENT__ = algoliasearch(appId, apiKey);
  }
  algoliaClient = globalThis.__ALGOLIA_CLIENT__;
} else {
  if (!globalThis.__ALGOLIA_CLIENT_SERVER__) {
    globalThis.__ALGOLIA_CLIENT_SERVER__ = algoliasearch(appId, apiKey);
  }
  algoliaClient = globalThis.__ALGOLIA_CLIENT_SERVER__;
}

export { algoliaClient };