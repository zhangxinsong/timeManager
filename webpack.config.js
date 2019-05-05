const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const px2rem = require('postcss-px2rem');
const autoprefixer = require('autoprefixer');
const ENV = process.env.NODE_ENV;


const config = {
    entry: [
		'@babel/polyfill',
		path.join(__dirname, 'src/main.js')
	],
    output: {
		path: path.join(__dirname, '/dist'),
		filename: 'js/[name].[hash:8].js'
    },
    resolve: {
        alias: {
            "Assets": path.resolve(__dirname,'./src/assets'),
            "Components": path.resolve(__dirname,'./src/components')
        },
        extensions: ['.js', '.vue', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader', // 处理以.vue结尾的文件
                exclude: /^node_modules$/,
            },
            {
                test: /\.js$/,
                use: [{loader: 'babel-loader',}],
                exclude: /^node_modules$/,
            },
            {
                test: /\.(le|c)ss$/, // 处理css、less文件
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {loader: "css-loader" },
                    {loader: "less-loader" },
                    {
                        loader: "postcss-loader",
                        options: {autoprefixer}
                    }
                ],
                exclude: /^node_modules$/,
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/, // 处理图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'images/[name].[ext]'
                        }
                    }
                ],
                exclude: /^node_modules$/,
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({   //全局变量
            "ENV": JSON.stringify(ENV)
        }),
        new HTMLPlugin({
            hash: true,
            title: '',
            template: path.join(__dirname,'index.html'),
            filename: 'index.html'
        }), // 处理html模版
        new MiniCssExtractPlugin({  //分离css代码
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ],
    optimization: {

    },
    performance: {
		hints: 'warning', // 枚举
		maxAssetSize: 20240000, // 整数类型（以字节为单位）
		maxEntrypointSize: 202400000, // 整数类型（以字节为单位
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
		}
	}
}
if(ENV == 'development'){  //开发模式
    config.devtool = 'cheap-module-eval-source-map'; // 调试代码时可以看到自己原本的代码，而不是编译后的
    config.mode = 'development'; //webpack 开发模式 --mode
    config.devServer = {
        port: 8080,
        host: 'localhost',
        overlay: {
            errors: true // 将webpack编译的错误显示在网页上面
        },
        contentBase: "./dist",
        open: true, // 在启用webpack-dev-server时，自动打开浏览器
        proxy: {
            '/api': {
                target: 'http://api.k780.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
else if(ENV == 'production'){   //生产模式
    config.devtool = 'cheap-module-source-map',
    config.mode = 'production';   //webpack 生产模式 --mode  'production' 自动压缩代码
    config.optimization = {
        splitChunks: {
			cacheGroups: {
				vendor: { // node_modules内的依赖库
					chunks: "all",
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0,
					priority: 1
				}
			}
		},
		runtimeChunk: {
			name: 'manifest'
		}
    }
}
module.exports = config;