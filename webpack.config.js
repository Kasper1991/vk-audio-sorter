module.exports = {

  context: __dirname + "/src",

  entry: "./app",

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '']
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: "cheap-inline-module-source-map",

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts"
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: "json"
      }
    ]
  },

  devServer: {
    inline: true,
    noInfo: false,
    open: true
  }
};