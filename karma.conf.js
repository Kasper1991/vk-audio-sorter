var webpackConfig = require('./webpack.config.js');

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {

  config.set({

    basePath: './',

    autoWatch: true,

    browsers: ['Chrome'],

    files: [
      {pattern: 'src/**/*.spec.js', watched: false}
    ],

    frameworks: ['mocha', 'chai'],

    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    reporters: ['progress'],

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
};