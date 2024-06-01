module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '(/__tests__/e2e/.*|(\\.|/)(e2e))\\.jsx?$',
  collectCoverage: true,
  coverageDirectory: 'coverage/e2e',
  coverageReporters: ['html', 'text', 'lcov'],
};