const path = require('path');

module.exports = {
    entry: './index.js',
    devtool: 'source-map',
    target: 'web',
    mode: process.env.NODE_ENV || 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: "glp",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                 test: /\.js$/, 
                 enforce: "pre",
                 loader: 'source-map-loader' 
            }
        ]
    },
};
