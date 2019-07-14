const HtmlWebPackPlugin = require("html-webpack-plugin");

const OUTPUT_PATH = "/dist";

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + OUTPUT_PATH
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.worker\.(js|ts)$/,
                loader: "worker-loader",
                options: {
                    publicPath: OUTPUT_PATH + "/"
                }
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
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
