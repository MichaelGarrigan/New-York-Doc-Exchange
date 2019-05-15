const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = () => true;

module.exports = {
  entry: path.join(__dirname, '/src/app.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './public'
  }
}