import getConfig from 'next/config';
import { ApolloLink } from '@apollo/client/link/core';
import { WebSocketLink } from '@apollo/client/link/ws';

const { publicRuntimeConfig } = getConfig();

export function createWsLink(): ApolloLink {
  return new WebSocketLink({
    uri: publicRuntimeConfig.apiWsUrl,
    options: {
      reconnect: true,
      timeout: 30000,
    },
  });
}
