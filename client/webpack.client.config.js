const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sharedConfig = require('./webpack.shared.config')

const clientPort = 8080

const config = {
    target: 'web',

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, './build/client'), // [A]
        filename: 'scripts/bundle.js', // [B]
        publicPath: `http://localhost:${clientPort}/`,
    },

    devServer: {
        port: clientPort,
        liveReload: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: 'camelCase',
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    }
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css', // [C]
        }),
        new CopyWebpackPlugin({patterns: [
            {from: 'public/static', to: 'public/static' },
            {from: 'public/locales', to: 'public/locales' },
        ]})
    ],
}

module.exports = merge(sharedConfig, config)