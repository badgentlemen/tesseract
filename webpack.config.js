var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./app.ts",
    output: {
        filename: "bundle.js"
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [new HtmlWebpackPlugin({
        inject: true,
        template: 'index.html'
    })],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(sa|sc|c)ss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: { loader: 'html-loader' }
            }
        ]
    }
};