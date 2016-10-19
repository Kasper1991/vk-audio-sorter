var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {

  config.set({

    basePath: './',

    files: [
      {pattern: 'src/**/*.spec.ts', watched: false}
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
      'src/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },

    webpackMiddleware: {
      noInfo: true
    },

    autoWatch: true,
    browsers: ['Chrome'],
    reporters: ['progress'],
    colors: true,
    singleRun: false,
    concurrency: Infinity
  });
};