'use strict';

const express   = require('express');
const fs        = require('fs');
const osprey    = require('osprey-mock-service');
const parser    = require('raml-parser');
const path      = require('path');
const shrinkRay = require('shrink-ray');
const spdy      = require('spdy');
// const https     = require('https'); // save for later
const logger    = require('morgan');

const app = express();
app.use(shrinkRay());
app.use(logger('dev'));

const root  = __dirname;
const api   = 'api.raml';
const port  = '8443';

const config = {
  key: fs.readFileSync(path.join(root, 'server.key')),
  cert: fs.readFileSync(path.join(root, 'server.crt'))
};

app.get('', (req, res) => { // default on root
  res
    .status(200)
    .json({message: 'ok'});
});

parser.loadFile(path.join(root, api))
  .then(raml => {

    app.use(osprey.createServer(raml));
    app.use(osprey(raml));

    spdy.createServer(config, app)
      .listen(port, err => {
        if (err) {
          throw new Error(err);
        } else {
          console.log(`Listening on port: https://localhost:${port}`);
        }
      })
      .catch(err => {
        console.log(err);
      });

  })
  .catch(err => {

    throw new Error(err);

  });
