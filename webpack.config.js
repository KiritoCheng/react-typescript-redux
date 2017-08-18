var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //入口文件的路径
    entry: "./src/index.tsx",
    output: {
        //打包的输出路径
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",

    },

    // 启用sourceMap
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            filename: 'index.html',
            template: './index.html' // 模版文件
        }),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ],

    resolve: {
        // 添加需要解析的文件格式
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    //加载的模块，这里包括ts和source-map
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [ "ts-loader"],
        }],
    },
    //webpack的本地服务器webpack-dev-server的配置
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        inline: true
    },


    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};