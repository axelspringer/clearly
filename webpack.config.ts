/* tslint:disable: variable-name max-line-length no-var-requires no-unused-variable */

/**
 *
 * - imports
 * - custom
 * - config
 * - common
 * - dev
 * - dll
 * - prod
 * - webpack
 */

// imports
import 'ts-helpers';
import {
  DllPlugin,
  DllReferencePlugin,
  DefinePlugin,
  // NoErrorsPlugin, // quality
  ProgressPlugin,
} from 'webpack';
import * as process from 'process';
import { AotPlugin } from '@ngtools/webpack';
import * as LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import * as ContextReplacementPlugin from 'webpack/lib/ContextReplacementPlugin';

import * as CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import * as MinChunkSizePlugin from 'webpack/lib/optimize/MinChunkSizePlugin';
import * as NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import * as OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import * as UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';

import * as CompressionPlugin from 'compression-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlElementsPlugin from './config/html-elements-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import * as webpackMerge from 'webpack-merge';
import * as V8LazyParseWebpackPlugin from 'v8-lazy-parse-webpack-plugin';
import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

// custom
import {
  CUSTOM_COPY_FOLDERS,
  CUSTOM_DEV_SERVER_OPTIONS,
  CUSTOM_RULES_COMMON,
  CUSTOM_PLUGINS_COMMON,
  CUSTOM_PLUGINS_DEV,
  CUSTOM_PLUGINS_PROD,
  // EXCLUDE_SOURCEMAPS,
} from './config/env';

import {
  root,
  isWebpackDevServer,
  tryDll,
} from './config/helpers';

import {
  polyfills,
  vendors,
  rxjs,
} from './src/dll';

import head from './config/head';
import meta from './config/meta';
// import tsconfigJson = require('./tsconfig.json');

// const compilerConfig =
//   Object.assign(tsconfigJson['compilerOptions'], { module: 'es2015' });

// config
const EVENT = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV || 'development';

const isDev = EVENT.includes('dev');
const isDll = EVENT.includes('dll');
const isAot = EVENT.includes('aot');

const PORT = process.env.PORT ||
  ENV === 'development' ? 3000 : 8080;
const HOST = process.env.HOST || 'localhost';

const COPY_FOLDERS: WebpackCopyFolder[] = [
  { from: `src/assets`, ignore: ['favicon.ico'] },
  { from: `src/assets/icon/favicon.ico` },
  { from: `src/meta` },
  { from: 'node_modules/hammerjs/hammer.min.js' },
  { from: 'node_modules/hammerjs/hammer.min.js.map' },
  { from: 'node_modules/clarity-icons/clarity-icons.min.js' },
  { from: 'node_modules/mutationobserver-shim/dist/mutationobserver.min.js' },
  { from: 'node_modules/@webcomponents/custom-elements/custom-elements.min.js' },
  { from: 'node_modules/@webcomponents/custom-elements/custom-elements.min.js.map' },

  ...CUSTOM_COPY_FOLDERS,

];

// is dll
if (!isDll && isDev) {
  tryDll(['polyfills', 'vendors', 'rxjs']);
}

// common
const commonConfig = () => {

  const config: WebpackConfig = {} as WebpackConfig;

  config.module = {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false,
            },
          },
        ],
        include: /angular/,
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader',
        ],
        exclude: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [root('src/index.html')],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader',
      },

      ...CUSTOM_RULES_COMMON,

    ],

  };

  config.plugins = [
    new V8LazyParseWebpackPlugin(),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlElementsPlugin({
      headTags: head,
    }),
    new NamedModulesPlugin(),
    new ProgressPlugin(),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/, root(`src`),
    ),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
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

// dev
const devConfig = () => {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'eval-source-map';

  config.resolve = {
    modules: [root(`src`), `node_modules`],
  };

  config.module = {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {},
          },
        ],
      },
    ],
  };

  config.entry = {
    main: [].concat(polyfills(), './src/main.client', rxjs()),
  };

  config.output = {
    path: root(`dist`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      meta,
      isDev,
      isWebpackDevServer,
      inject: 'head',
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

// dll
const dllConfig = () => {

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

// prod
const prodConfig = () => {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'source-map';

  config.entry = {
    main: `./src/main.client`,
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
    // new NoErrorsPlugin(), // quality
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendors', 'rxjs'].reverse(),
    }),
    new OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyWebpackPlugin(COPY_FOLDERS),
    new HtmlWebpackPlugin({
      template: `src/index.html`,
      meta,
      inject: true,
    }),
    new LoaderOptionsPlugin({
      debug: false,
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
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      comments: false,
    }),
    new WebpackMd5Hash(),

    ...CUSTOM_PLUGINS_PROD,

  ];

  if (isAot) {
    config.plugins.push(new AotPlugin({
      tsConfigPath: 'tsconfig.json',
      mainPath: 'src/main.client.ts',
    }));
  }

  return config;

};

// default
const defaultConfig = () => {

  const config: WebpackConfig = {} as WebpackConfig;

  config.resolve = {
    extensions: ['.ts', '.js', '.json'],
  };

  return config;

};

// webpack
switch (ENV) {
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
