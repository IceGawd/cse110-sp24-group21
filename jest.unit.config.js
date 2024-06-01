module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/unit/.*|(\\.|/)(unit))\\.jsx?$',
  collectCoverage: true,
  coverageDirectory: 'coverage/',
  coverageReporters: ['html', 'text', 'lcov'],
};