const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const extractLess = new ExtractTextPlugin('style.css');

function getFullPath(relPath = '') {
    return path.join(__dirname, relPath);
}

const webpackConfig = {
    entry: {
        app: './src/app.js',
    },

    cache: true,
    watch: true,
    target: 'web',
    mode: 'production',
    devtool: 'inline-cheap-module-source-map',

    output: {
        path: getFullPath('./dist'),
        filename: '[name].js',
        publicPath: '/.s/src/panel-v2/',
    },

    stats: {
        warnings: false,
        children: false,
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },

        minimizer: [
            // new ParallelUglifyPlugin({
            //     workerCount: 4,
            //     uglifyES: {
            //         ecma: 8,
            //         mangle: true,
            //     },
            // }),
        ],
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractLess.extract({
                            use: [
                                {
                                    loader: 'vue-style-loader',
                                },
                                {
                                    loader: 'css-loader',
                                },
                            ],

                            fallback: 'style-loader',
                        }),
                    },
                },
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [getFullPath('development/js'), getFullPath('development/entryPoints')],
                exclude: /(node_modules|bower_components)/,
            },

            {
                test: /\.css$/,
                loader: extractLess.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: !true,
                                sourceMap: true,
                            },
                        },
                    ],

                    fallback: 'style-loader',
                }),
            },

            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader?name=images/[name].[ext]',
                include: [getFullPath('development/img'), getFullPath('node_modules/font-awesome')],
            },

            {
                test: /\.(woff|ttf|eot|svg|woff2)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
                include: [
                    getFullPath('development/fonts'),
                    getFullPath('node_modules/font-awesome'),
                ],
            },
        ],
    },

    plugins: [
        extractLess,
        new VueLoaderPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: { discardComments: { removeAll: true } },
        }),
    ],
};

module.exports = webpackConfig;
