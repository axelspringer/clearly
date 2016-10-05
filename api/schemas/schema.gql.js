'use strict';

// const casual    = require('casual');
const schema = `
type Query {
  testString(answer:String): String
}

schema {
  query: Query
}
`;

const resolvers = {
  Query: {
    testString(_, args) {
      return `It Works! ${args.answer || 'empty'}`;
    }
  }
};

module.exports = {
  typeDefs: schema,
  resolvers: resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
};
