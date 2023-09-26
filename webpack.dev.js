const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|woff|otf|fnt|mp3|jpe?g|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.json$/,
                loader: 'file-loader',
                type: 'javascript/auto'
            },
            {
                test: /\.m?js/,
                type: "javascript/auto",
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, "../")
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'Loader/assets', to: 'assets' }],
        }),
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        })
    ]
};