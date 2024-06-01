module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/unit/.*|(\\.|/)(unit))\\.jsx?$',
  collectCoverage: true,
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['html', 'text', 'lcov'],
};