'use strict';

const apollo      = require('apollo-server');
const bodyParser  = require('body-parser');
const chalk       = require('chalk');
// const cors        = require('cors');
const express     = require('express');
const fs          = require('fs');
// const osprey      = require('osprey-mock-service');
// const parser      = require('raml-parser');
const path        = require('path');
const shrinkRay   = require('shrink-ray');
const spdy        = require('spdy');
// const https     = require('https'); // save for later
const logger      = require('morgan');
const tools       = require('graphql-tools');

// Schema
const schema      = require('./schemas/schema.gql');
const execSchema  = tools.makeExecutableSchema(schema);

const app = express();
app.use(shrinkRay());
app.use(logger('dev'));
// app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const root = __dirname;
const port = '8443';

// REST
// const api = 'api.raml';

const config = {
  key: fs.readFileSync(path.join(root, 'server.key')),
  cert: fs.readFileSync(path.join(root, 'server.crt')),
  ca: fs.readFileSync(path.join(root, 'server.csr'))
};

// GraphQL
app.use('/graphql', apollo.apolloExpress(req =>{
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    throw new Error(`Query too large.`);
  }

  return {
    schema: execSchema
  };
}));

// GraphiQL
app.use('/graphiql', apollo.graphiqlExpress({
  endpointURL: '/graphql'
}));

// const createRAMLServer = raml => {
//   // REST
//   // app.use(osprey.createServer(raml));
//   // app.use(osprey(raml));

//   // GraphQL
//   app.use('/graphql', bodyParser.json(), apollo.apolloExpress({}));

//   // GraphiQL
//   app.use('/graphiql', apollo.graphiqlExpress({
//     endpointURL: '/graphql'
//   }));

// };

const handleError = err => {
  throw new Error(err);
};

app.get('', (req, res) => { // default on root
  res
    .status(200)
    .json({
      message: 'ok'
    });
});

app.get('/favicon.ico', (req, res) => { // lame
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
});

// REST
// parser.loadFile(path.join(root, api))
//   .then(createServer)
//   .catch(handleError);

spdy.createServer(config, app)
  .listen(port, err => {
    if (err) {
      throw new Error(err);
    } else {
      console.log(chalk.white(`Listening on:`), chalk.green.bold(`https://localhost:${port}\n`));
    }
  });
