// Configuring Jest
// See: https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  // without this line rootDir will be `./tests`
  // 'rootDir': '..',

  'moduleFileExtensions': [
    'js',
    'jsx',
    'json',
  ],
  'transform': {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|svg\\?inline)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  'moduleNameMapper': {
    '^~/(.*)$': '<rootDir>/client/$1',
    '^@/(.*)$': '<rootDir>/tests/$1',
  },
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/docker/',
  ],

  'collectCoverage': true,
  'coverageThreshold': {
    'global': {
      'branches': 40,
      'functions': 40,
      'lines': 40,
      'statements': 50
    },
  },
  'coveragePathIgnorePatterns': [
    '/node_modules/',
    '/tests/',
  ],
  'verbose': true,
}
