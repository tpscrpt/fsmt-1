module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**/*.ts"],
  testPathIgnorePatterns: ["__fixtures__"]
};
