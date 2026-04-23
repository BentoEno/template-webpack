import path from 'node:path';
import htmlWebpackPlugin from 'html-webpack-plugin';

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
            // {
            //     test: /\.js$/,          // process all .js files
            //     exclude: /node_modules/,
            //         use: {
            //         loader: 'babel-loader' // needs: npm install babel-loader @babel/core @babel/preset-env
            //         }
            // }
        ],
    },
};