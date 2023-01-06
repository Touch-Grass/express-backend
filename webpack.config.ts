import path from 'path';

// import DeclarationBundlerPlugin from 'declaration-bundler-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
  entry: {
    mylib: path.resolve(__dirname, 'src/main.ts')
  },
  module: {
    rules: [
      {
        // test: /^((?!d).)ts$/gm,
        test: /\.ts$/gm,
        exclude: [/node_modules/],
        loader: 'ts-loader'
      }
    ]
  },

  mode: 'production',

  resolve: { extensions: ['.ts'] },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    clean: true
  },

  plugins: [
    // new DeclarationBundlerPlugin({
    //   moduleName: '"mylib"',
    //   out: '@types/index.d.ts'
    // }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'backend/package.json', to: 'backend/dist/package.json' }]
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
