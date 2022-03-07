import { createUploadLink } from 'apollo-upload-client';
import getConfig from 'next/config';
import { ApolloLink } from '@apollo/client/link/core';

const { publicRuntimeConfig } = getConfig();

export function createHttpLink(): ApolloLink {
  return ApolloLink.from([
    createUploadLink({
      uri: publicRuntimeConfig.apiUrl,
    }),
  ]);
}
