var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    debug: true,
    devTools: 'sourcemap',
    entry: [
        'webpack-dev-server/client?http://localhost:3000', //--inline
        'webpack/hot/only-dev-server', //--hot
        './src/index.js'
    ],
    resolve: {
        alias: {
            'jsxgraph-react': path.resolve(__dirname, '..')
        }
    },
    output: {
        path: __dirname + "/dist",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["react-hot", "babel"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            filename: 'index.html'
        })
    ]
};