const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const DeclarationBundlerPlugin = require('types-webpack-bundler');

const config = {
    target: 'node',

    mode: 'development',

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
        new DeclarationBundlerPlugin({
            moduleName: 'some.path.moduleName',
            out: './types/main.d.ts'
        }),
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

module.exports = config;
