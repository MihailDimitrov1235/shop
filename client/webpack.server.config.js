const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.js');

let config = {
    target: 'node', // [A]

    entry: './server/index.js', // [B]

    output: { // [C]
        path: path.join(__dirname, './build/server'), 
        filename: 'bundle.js',
    },

    externals: [webpackNodeExternals()], // [D]

    experiments: {
        topLevelAwait: true
    },

    module: {
        rules: [{
            test: /\.css$/, // [E]
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            exportOnlyLocals: true,
                            exportLocalsConvention: 'camelCase',
                            localIdentName: '[local]_[hash:base64:5]'
                        },
                    }
                },
            ]
        }],
    },
};

module.exports = merge(sharedConfig, config); // [F]