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
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
