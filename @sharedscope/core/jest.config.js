module.exports = {
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};
