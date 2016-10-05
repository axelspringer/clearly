'use strict';

const osprey    = require('osprey-mock-service');
const express   = require('express');
const parser    = require('raml-parser');
const path      = require('path');

const app = express();

const root  = __dirname;
const api   = 'api.raml';
const port  = '8080';


parser.loadFile(path.join(root, api))
  .then(raml => {
    app.use(osprey.createServer(raml));
    app.use(osprey(raml));
    app.listen(port);
  })
  .catch(err => {

    console.error(new Error(err));

  });
