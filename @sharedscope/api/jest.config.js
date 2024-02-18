module.exports = {
  preset: "ts-jest",
  // other configurations...
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "src"],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/src/tretacore/"
  ],
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", 
    "!src/**/*.d.ts",
    // Exclude /src/tretacore/ from coverage -- tretacore is generated from protobuf-ts
    "!src/tretacore/**/*" ],
};
