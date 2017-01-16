interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: any;
  externals?: any;
  output: any;
  module?: any;
  plugins?: Array<any>;
  performance?: boolean | {
    hints?: string,
    assetFilter?: string,
    maxEntrypointSize?: string,
    maxAssetSize?: string
  };
  resolve?: {
    extensions?: Array<string>;
    modules?: Array<string>;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
    proxy?: any;
    host?: string;
    quiet?: boolean;
    noInfo?: boolean;
    watchOptions?: any;
  };
  node?: {
    process?: boolean;
    global?: boolean;
    Buffer?: boolean;
    crypto?: boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean;
    __dirname?: boolean;
    __filename?: boolean;
  };
}
