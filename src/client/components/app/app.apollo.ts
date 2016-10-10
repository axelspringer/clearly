// Importables
import { createNetworkInterface } from 'apollo-client';
import ApolloClient from 'apollo-client';

import { ApolloConfig } from '../../config';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface(ApolloConfig.uri),
});
