module.exports = {
  testRegex: "/src/.*spec\\.js$",
  setupFiles: ["<rootDir>/test/shim.js", "<rootDir>/test/setup.js"],
  collectCoverageFrom: ["src/**/*.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
