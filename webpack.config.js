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
            loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0']
          }
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: ['node_modules']
}
