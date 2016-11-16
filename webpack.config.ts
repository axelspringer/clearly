/* tslint:disable: variable-name max-line-length no-var-requires no-unused-variable */
/**
 * @author: @AngularClass
 */
import 'ts-helpers';
import 'core-js/es6';
import 'core-js/es7/reflect';

import {
  CUSTOM_COPY_FOLDERS,
  CUSTOM_DEV_SERVER_OPTIONS,
  // HTML5_BASE_URL,
  CUSTOM_RULES_COMMON,
  // CUSTOM_RULES_PROD,
  // CUSTOM_RULES_DEV,
  CUSTOM_PLUGINS_COMMON,
  CUSTOM_PLUGINS_DEV,
  CUSTOM_PLUGINS_PROD,
  EXCLUDE_SOURCEMAPS,
} from './config/env';

import {
  root,
  isWebpackDevServer,
  // hasProcessFlag,
  tryDll,
  tryAot,
} from './config/helpers';

import {
  polyfills,
  vendors,
  rxjs,
} from './src/dll';

import head from './config/head';
import meta from './config/meta';

const { ContextReplacementPlugin }  = require('webpack');
const { DefinePlugin }        = require('webpack');
const { DllPlugin }           = require('webpack');
const { DllReferencePlugin }  = require('webpack');
// const { NoErrorsPlugin }      = require('webpack');
const { ProgressPlugin }      = require('webpack');

const LoaderOptionsPlugin     = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin      = require('webpack/lib/NamedModulesPlugin');

const CommonsChunkPlugin      = require('webpack/lib/optimize/CommonsChunkPlugin');
const MinChunkSizePlugin      = require('webpack/lib/optimize/MinChunkSizePlugin');
const UglifyJsPlugin     = require('webpack/lib/optimize/UglifyJsPlugin');

const { ForkCheckerPlugin }   = require('awesome-typescript-loader');
const CompressionPlugin       = require('compression-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const HtmlElementsPlugin      = require('./config/html-elements-plugin');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const WebpackMd5Hash          = require('webpack-md5-hash');
const webpackMerge            = require('webpack-merge');

const EVENT = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV || 'development';

const isDev = EVENT.includes('dev');
const isDll = EVENT.includes('dll');
const isAot = EVENT.includes('aot');

const PORT = process.env.PORT ||
  ENV === 'development' ? 3000 : 8080;
const HOST = process.env.HOST || 'localhost';

const COPY_FOLDERS = [
  { from: `src/assets` },
  { from: `src/meta` },
  // { from: 'node_modules/hammerjs/hammer.min.js' },
  // { from: 'node_modules/hammerjs/hammer.min.js.map' },

  ...CUSTOM_COPY_FOLDERS,

];

if (!isDll && isDev) { // if we not aim for creating dll
  tryDll(['polyfills', 'vendors', 'rxjs']);
}

if (!isDev && isAot) {
  tryAot();
}

const commonConfig = function webpackConfig(): WebpackConfig {

  const config: WebpackConfig = {} as WebpackConfig;

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCEMAPS],
      },
      {
        test: /\.ts$/,
        loaders: [
          // '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          'angular2-template-loader',
        ],
        exclude: [
          /\.(spec|e2e)\.ts$/,
          /(node_modules)/,
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [root('src/index.html')],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },

      ...CUSTOM_RULES_COMMON,

    ],

  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root(`src`),
    ),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),
    new NamedModulesPlugin(),
    new HtmlElementsPlugin({
      headTags: head,
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': JSON.stringify(process.env),
    }),

    ...CUSTOM_PLUGINS_COMMON,

  ];

  config.node = {
    Buffer: false,
    clearImmediate: false,
    clearTimeout: true,
    crypto: true,
    global: true,
    module: false,
    process: true,
    setImmediate: false,
    setTimeout: true,
  };

  return config;

};

const devConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'cheap-module-source-map';

  config.resolve = {
    modules: [root(`src`), `node_modules`],
  };

  config.entry = {
    main: [].concat(polyfills(), './src/main.client', rxjs()),
  };

  config.output = {
    path: root(`dist`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
  };

  COPY_FOLDERS.push({ from: `dll`, ignore: ['*.json'] });

  config.plugins = [
    new LoaderOptionsPlugin({
      debug: true,
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/polyfills-manifest.json`),
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/vendors-manifest.json`),
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/rxjs-manifest.json`),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      meta: meta,
      isDev: isDev,
      isWebpackDevServer: isWebpackDevServer,
      inject: true,
    }),
    new CopyWebpackPlugin(COPY_FOLDERS),

    ...CUSTOM_PLUGINS_DEV,

  ];

  if (isWebpackDevServer) {
    config.devServer = Object.assign(
      {
        contentBase: root(`src`),
        historyApiFallback: true,
        host: HOST,
        port: PORT,
      },
      CUSTOM_DEV_SERVER_OPTIONS,
    );
  }

  return config;

};

const dllConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.entry = {
    polyfills: polyfills(),
    rxjs: rxjs(),
    vendors: vendors(),
  };

  config.output = {
    path: root(`dll`),
    filename: '[name].dll.js',
    sourceMapFilename: '[name].dll.map',
    library: '__[name]',
  };

  config.plugins = [
    new DllPlugin({
      name: '__[name]',
      path: root('dll/[name]-manifest.json'),
    }),
  ];

  return config;

};

const prodConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'source-map';

  config.entry = {
    main: !isAot ? `./src/main.client` : `./src/main.client.aot`,
    polyfills: polyfills(),
    rxjs: rxjs(),
    vendors: vendors(),
  };

  config.output = {
    path: root(`dist`),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js',
  };

  config.plugins = [
    // new NoErrorsPlugin(),
    new WebpackMd5Hash(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new LoaderOptionsPlugin({
      debug: false,
    }),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendors', 'rxjs'].reverse(),
    }),
    new MinChunkSizePlugin({
      minChunkSize: 10000,
    }),
    new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
      },
      comments: false,
    }),
    new CopyWebpackPlugin(COPY_FOLDERS),
    new HtmlWebpackPlugin({
      template: `src/index.html`,
      meta: meta,
      inject: true,
    }),

    ...CUSTOM_PLUGINS_PROD,

  ];

  return config;

};

const defaultConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.resolve = {
    extensions: ['.ts', '.js', '.json', '.graphql'],
  };

  return config;

};

switch (ENV) { // it is the most simple logic
  case 'prod':
  case 'production':
    module.exports = webpackMerge({}, defaultConfig(), commonConfig(), prodConfig());
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = isDll
      ? webpackMerge({}, defaultConfig(), commonConfig(), dllConfig())
      : webpackMerge({}, defaultConfig(), commonConfig(), devConfig());
}
