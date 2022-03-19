module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.ts',
    'src/__test__',
    'tests',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
