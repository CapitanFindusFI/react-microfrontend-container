import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration} from 'webpack';

const webpackConfiguration = (): Configuration => ({
    entry: path.join(__dirname, 'src', 'index.tsx'),
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'build', 'index.html'),
        }),
    ],
    devServer: {
        client: {
            logging: 'info',
        },
        static: {
            directory: path.join(__dirname, 'build'),
        },
        historyApiFallback: true,
        port: 9999,
        compress: true,
    },
});

export default webpackConfiguration;
