const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const libJson = require('./src/data/lib.json');

module.exports = {
    entry: {
      index:'./src/index.js',
      doc: './src/main_doc.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'docs'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        scriptLoading: 'blocking',
        chunks: ['index'],
        template: './src/view/index.ejs',
        templateParameters: {
          'json': libJson
        },
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        scriptLoading: 'blocking',
        chunks: ['doc'],
        template: './src/view/doc.ejs',
        templateParameters: {
          'json': libJson,
        },
        filename: 'doc.html',
      })
    ],
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: ['style-loader','css-loader'],
        },
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {},
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
      ],
    },
};