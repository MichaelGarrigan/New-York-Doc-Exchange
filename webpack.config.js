const path = require('path');
console.log('path: ', path.join(__dirname, '/public'))
module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
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