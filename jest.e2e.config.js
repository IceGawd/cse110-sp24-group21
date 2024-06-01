module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '(/__tests__/e2e/.*|(\\.|/)(e2e))\\.jsx?$',
  collectCoverage: true,
  coverageDirectory: 'e2e-coverage',
  coverageReporters: ['html', 'text', 'lcov'],
};