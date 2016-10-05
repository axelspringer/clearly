'use strict';

// const casual    = require('casual');
const schema = `
type Query {
  testString: String
}

schema {
  query: Query
}
`;

const resolvers = {
  Query: {
    testString: () => 'It Works!'
  }
};

module.exports = {
  typeDefs: schema,
  resolvers: resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
};
