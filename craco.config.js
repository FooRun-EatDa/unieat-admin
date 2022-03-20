const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@component': path.resolve(__dirname, 'src/component/'),
      '@enums': path.resolve(__dirname, 'src/enums/'),
      '~': path.resolve(__dirname, 'src/'),
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1',
        '^~(.*)$': '<rootDir>/src$1'
      }
    }
  }
};
