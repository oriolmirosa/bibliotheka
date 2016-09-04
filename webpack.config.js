var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3333',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './main.js'
  ],
  output: {
    path: '/',
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        text: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
