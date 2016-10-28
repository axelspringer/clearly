// Application Configuration
export class ApolloConfig {

  public static uri: string =
    'production' === ENV
      ? 'http://editor.test.tortuga.cloud:5012/graphql'
      : 'http://localhost:8080/graphql';
};
