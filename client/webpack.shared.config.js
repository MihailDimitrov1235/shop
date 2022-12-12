module.exports = {
    mode: process.env.NODE_ENV === 'production' // [A]
        ? 'production' 
        : 'development',

    module: {
        rules: [
            { // [B]
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.css'], // [C]
    },
};