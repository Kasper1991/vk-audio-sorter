module.exports = {

  context: __dirname + "/src",

  entry: "./app",

  output: {
    path: __dirname + "/dist",
    filename: "app.js",
    publicPath: '/dist/'
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: "cheap-inline-module-source-map",

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
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
    noInfo: true,
    open: true
  }
};