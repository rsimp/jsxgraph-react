/**
 * Created by Robert on 4/16/2016.
 */
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
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
                loader: ["babel"],
                query: {
                    presets: ['es2015', 'react', 'stage-1', 'react-hmre'],
                    cacheDirectory: true
                }
            }
        ]
    }
};