// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-scss-preprocessor')
    ],
    files: [
      { pattern: './src/test.ts', watched: false  },
      { pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css', watched: false, included: true },
      { pattern: './node_modules/bootstrap/dist/css/bootstrap.min.css', included: true, watched: false },
      { pattern: './src/styles.scss', watched: true, included: false, served: true }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli'],
      './src/styles.scss': ['scss']
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
