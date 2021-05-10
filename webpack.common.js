const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
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
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['index'],
        template: './src/view/index.ejs',
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['doc'],
        template: './src/view/doc.ejs',
        filename: 'doc.html',
      }),
    ],
};