export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov', 'json', 'clover'],
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: '50%',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/src/.*/__mocks__'],
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['node_modules'],
};
