import algoliasearch from 'algoliasearch/lite';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '';

// Simply export the initialized client
export const algoliaClient = algoliasearch(appId, apiKey);