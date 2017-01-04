// Importables
import { createNetworkInterface } from 'apollo-client';
import ApolloClient from 'apollo-client';

// Components
import { ApolloConfig } from '../../config';

export const Client = (): ApolloClient => {
  return new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: ApolloConfig.uri,
    }),
  });
};
