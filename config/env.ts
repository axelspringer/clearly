/**
 * @author: @AngularClass
 */
import {
  root,
} from './helpers.ts';

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

export const EXCLUDE_SOURCEMAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
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
          autoprefixer,
          cssnano,
        ];
      },
    },
  }),
];

export const CUSTOM_PLUGINS_DEV = [

];

export const CUSTOM_PLUGINS_PROD = [

];

export const CUSTOM_RULES_COMMON = [
  {
    test: /\.scss$/,
    loaders: ['to-string-loader', 'css', 'postcss', 'sass'],
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
