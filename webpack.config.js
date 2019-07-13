const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src-temp/index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /worker\.js$/,
                use: {
                    loader: "worker-loader"
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]/*,
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }*/
};
