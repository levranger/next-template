import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloLink } from '@apollo/client/link/core';

import { createHttpLink } from './http';
import { createWsLink } from './ws';

const isBrowser = typeof window !== 'undefined';

export function createLink(): ApolloLink {
  const http = createHttpLink();
  if (!isBrowser) return http;

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    createWsLink(),
    http,
  );
}
