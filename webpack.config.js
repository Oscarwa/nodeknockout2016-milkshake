var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './public/js/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: [
          {
            test: /.js/, 
            exclude: /node_modules/, 
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
          }
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: ['node_modules']
}
