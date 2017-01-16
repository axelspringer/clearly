import { root } from './helpers';

import { LoaderOptionsPlugin } from 'webpack';
import * as Autoprefixer from 'autoprefixer';
import * as CssNano from 'cssnano';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

export const EXCLUDE_SOURCEMAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs'),
];

export const CUSTOM_COPY_FOLDERS = [
  { from: 'node_modules/clarity-icons/clarity-icons.min.js' },
  { from: 'node_modules/mutationobserver-shim/dist/mutationobserver.min.js' },
  { from: 'node_modules/@webcomponents/custom-elements/custom-elements.min.js' },
  { from: 'node_modules/@webcomponents/custom-elements/custom-elements.min.js.map' },
];

export const CUSTOM_PLUGINS_COMMON = [
  new ExtractTextPlugin('boot.css'),
  new LoaderOptionsPlugin({
      debug: true,
      options: {
        postcss: () => {
          return [
            Autoprefixer,
            CssNano,
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
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    use: 'graphql-tag/loader',
  },
  {
    test: /boot.scss/,
    use: [
      ExtractTextPlugin.extract([
        'style',
        'css',
        'postcss',
        'sass',
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
