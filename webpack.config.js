const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/** */
const baseConfig = mode => ({
  entry: ['./src/polyfills.js', './src/index.js'],
  module: {
    rules: [
      {
        include: path.resolve(fs.realpathSync(process.cwd()), '.'), // CRL
        loader: require.resolve('babel-loader'),
        options: {
          // Save disk space when time isn't as important
          cacheCompression: true,
          cacheDirectory: true,
          compact: true,
          envName: mode,
        },
        test: /\.(js|mjs|jsx)$/,
      },
      {
        resolve: { byDependency: { esm: { fullySpecified: false } } },
        test: /\.mjs$/i,
      },
      {
        include: path.resolve(fs.realpathSync(process.cwd()), '.'), // CRL
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: (mode !== 'production'),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  output: {
    filename: 'mirador.min.js',
    hashFunction: 'md5',
    library: 'Mirador',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
});

/** parse additional local configuration for webpack dev server */
const additionalDevServerConfig = () => {
  if (!process.env.DEV_SERVER_CONFIG) return {};
  const devServerConfigPath = path.resolve(fs.realpathSync(process.cwd()), process.env.DEV_SERVER_CONFIG);

  try {
    return JSON.parse(fs.readFileSync(devServerConfigPath, 'utf8'));
  } catch (error) {
    console.warn(`Problem with additional devServer config at: ${devServerConfigPath}`);
    if (error.code === 'ENOENT') {
      console.warn('Configured additional devServer config path does not exist!');
    } else {
      console.error(`Unexpected error code ${error.code} trying to read additional devServer config`);
      console.debug({ error });
    }
    return {};
  }
};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = baseConfig(options.mode);

  if (isProduction) {
    return {
      ...config,
      devtool: 'source-map',
      mode: 'production',
      plugins: [
        ...(config.plugins || []),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
    };
  }

  return {
    ...config,
    devServer: {
      hot: true,
      port: 4444,
      static: [
        './__tests__/integration/mirador',
        './__tests__/fixtures',
      ],
      ...additionalDevServerConfig(),
    },
    devtool: 'eval-source-map',
    mode: 'development',
    plugins: [
      ...(config.plugins || []),
      new ReactRefreshWebpackPlugin(),
    ],
  };
};
