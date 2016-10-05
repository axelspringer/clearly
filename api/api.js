'use strict';

const raml2html   = require('raml2html');
const fs          = require('fs');
const path        = require('path');
const defaults    = raml2html.getDefaultConfig();

const root  = __dirname;
const spec  = 'api.raml';
const doc   = 'api.html';

raml2html.render(path.join(root, spec), defaults)
  .then(html => {

    fs.writeFile(path.join(root, doc));

  }, err => {

    console.log(err); process.exit(1); // a bit lame

  });
