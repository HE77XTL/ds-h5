const base = require('./webpack.config.js');
const path = require('path');

module.exports = Object.assign({}, base, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9011,
        hot: true,
        open: true,
    },
})
