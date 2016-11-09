// Importables
import { createNetworkInterface } from 'apollo-client';
import ApolloClient from 'apollo-client';

// Components
import { ApolloConfig } from '../../config';

export const client: ApolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: ApolloConfig.uri,
  }),
});
