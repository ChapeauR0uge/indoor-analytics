const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        scriptLoading: 'blocking',
        chunks: ['doc'],
        template: './src/view/doc.ejs',
        filename: 'doc.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {},
          },
        },
      ],
    },
};