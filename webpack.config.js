var webpack = require('webpack')

module.exports = [
  {
    entry: [
      'webpack-dev-server/client?http://localhost:3333',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src/main.js'
    ],
    output: {
      path: '/',
      filename: 'bundle.js',
      publicPath: '/build/js'
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
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  },
  {
    entry: {'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'},
    output: {
      path: '/',
      filename: 'pdf.worker.bundle.js',
      publicPath: '/build/js'
    }
  }
]
