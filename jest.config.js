module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|pouchdb-adapter-asyncstorage' +
      '|pouchdb-react-native' +
      '|react-native-simple-toast' +
      '|react-native-elements' +
      '|react-native-status-bar-height' +
      '|react-native-vector-icons' +
      '|react-native-ratings' +
    ')/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup-tests.js'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/setup-tests.js'],
  collectCoverageFrom: ['src/**/*.js']
};
