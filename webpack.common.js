import path from 'node:path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import test from 'node:test';

export default {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new htmlWebpackPlugin ({
            title: 'Production',
            template: './src/template.html',
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(import.meta.dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};