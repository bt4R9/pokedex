'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = process.env.NODE_ENV || 'development';
const IS_DEV = env === 'development';

module.exports = {
    context: __dirname,
    devtool: 'cheap-module-source-map',
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router-dom',
            'lodash',
            'prop-types'
        ],
        data: './src/data.js',
        index: './src/index.js'
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
    },
    target: 'web',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': "development",
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new ExtractTextPlugin('bundle.css'),
        !IS_DEV ? new UglifyJsPlugin() : () => {}
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: {
        hints: false
    }
};
