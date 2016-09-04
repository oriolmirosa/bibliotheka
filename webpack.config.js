var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3333',
    'webpack/hot/dev-server',
    './main.js'
  ],
  output: {
    path: './',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        text: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: './'
  }
}
