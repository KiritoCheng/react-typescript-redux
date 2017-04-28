var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'history',
			'redux',
			'react-redux',
			'react-router',
			'react-tap-event-plugin',
			'react-router-redux',
			'crypto',
			'material-ui',
			'material-ui/styles',
			'material-ui/svg-icons'
		],
        index: './src/index.tsx'
    },
	cache: true,
	output: {
		path: __dirname + '/assets',
		filename: '[name].js',
		publicPath: "/assets/",
	},
	watch: true,

	resolve: {
		extensions: ['', '.ts', '.js', '.tsx', '.jsx'],
		modulesDirectories: ['src', 'node_modules']
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				query: {
					target: 'ES5',
					module: 'commonjs',
					jsx: 'react',
			        noImplicitAny: true,
			        removeComments: true,
			        preserveConstEnums: true,
			        noEmitOnError: true,
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
			}
		]
	},
	postcss: function (webpack) {
        return {
            defaults: [autoprefixer, precss],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    },
    plugins: [
    	new ExtractTextPlugin('[name].css', { allChunks: true, disable: false }),
    	new CommonsChunkPlugin({name: "vendor", minChunks: Infinity}),
    	new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"production"'
		}),
		new HtmlWebpackPlugin({
			title: '测试',
			filename: 'index.html',
			template: './index.html',
		}),
    ]
}
