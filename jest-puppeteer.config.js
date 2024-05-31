module.exports = {
  launch: {
    headless: true,
    slowMo: 25,
    args: ["--start-maximized"],
    defaultViewport: null
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov'],
}