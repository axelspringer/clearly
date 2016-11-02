// Application Configuration
export class ApolloConfig {

  public static uri: string =
    ENV === 'development'
      ? 'http://localhost:8080/graphql'
      : 'http://editor.test.tortuga.cloud'; // TODO@sebastian should be dynamic

};
