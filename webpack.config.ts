import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import nodeExternals from 'webpack-node-externals';
// import DeclarationBundlerPlugin from 'declaration-bundler-webpack-plugin';

const config: webpack.Configuration = {
  // entry: {
  //   mylib: path.resolve(__dirname, 'hello.ts')
  // },
  mode: 'development',

  target: 'node',
  externals: [nodeExternals()],

  entry: path.resolve(__dirname, 'src/main.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
    symlinks: false,
    fallback: {
      crypto: false,
      fs: false,
      path: false,
      stream: false,
      util: false,
      zlib: false,
      url: false,
      querystring: false,
      http: false,
      async_hooks: false
    }
  },

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    clean: true
  },

  node: false,

  plugins: [
    // new DeclarationBundlerPlugin({ moduleName: 'mylib', out: '@types/index.d.ts' }),
    new CopyWebpackPlugin({
      patterns: [{ from: './package.json', to: './package.json' }]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
};

export default config;
