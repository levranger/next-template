import { useMemo } from 'react';
import { ApolloClient } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import createCache from './createCache';
import { createLink } from './link';

let apolloClient;

function createApolloClient() {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
    },
  }));
  return new ApolloClient({
    ssrMode: true,
    // @ts-ignore
    link: authLink.concat(createLink()),
    // @ts-ignore
    cache: createCache(),
    queryDeduplication: true,
  });
}

export function initializeApollo(initialState = null): ApolloClient<unknown> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState = {}): ApolloClient<unknown> {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
