/**
 * @author: @AngularClass
 */
import { root } from './helpers.ts';

import * as Autoprefixer from 'autoprefixer';
import * as CssNano from 'cssnano';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import * as OfflinePlugin from 'offline-plugin';

export const EXCLUDE_SOURCEMAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/angular2-apollo'),
  root('node_modules/apollo-client-rxjs'),
  root('node_modules/apollo-client'),
  root('node_modules/rxjs'),
];

export const CUSTOM_COPY_FOLDERS = [

];

export const CUSTOM_PLUGINS_COMMON = [
  new LoaderOptionsPlugin({
    debug: true,
    options: {
      postcss: function () {
        return [
          Autoprefixer,
          CssNano,
        ];
      },
    }
  }),
  new ExtractTextPlugin('boot.css'),
];

export const CUSTOM_PLUGINS_DEV = [

];

export const CUSTOM_PLUGINS_PROD = [
  new OfflinePlugin(),
];

export const CUSTOM_RULES_COMMON = [
  {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    use: ['graphql-tag/loader']
  },
  {
    test: /boot.scss/,
    use: [
      ExtractTextPlugin.extract([
        'style',
        'css',
        'postcss',
        'sass'
      ]),
    ],
  },
  {
    test: /\.scss$/,
    use: [
      'to-string-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
];

export const CUSTOM_RULES_DEV = [

];

export const CUSTOM_RULES_PROD = [

];

export const CUSTOM_DEV_RULES = [

];

export const CUSTOM_PROD_RULES = [

];

export const CUSTOM_PROD_PLUGINS = [

];

export const CUSTOM_DEV_SERVER_OPTIONS = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};

export const CUSTOM_DEV_PLUGINS = [

];

export const HTML5_BASE_URL = '/';
