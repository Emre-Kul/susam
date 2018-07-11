const path = require('path');

module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    target: 'web',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: "glp",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js']
    }
};
