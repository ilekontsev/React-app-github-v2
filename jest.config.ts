import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(jpg)$": "<rootDir>/tests/mockFile.ts",
    "\\.(png)$": "<rootDir>/tests/mockFile.ts",
    "\\.(css)$": "<rootDir>/tests/mockFile.ts",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageReporters: ["html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/services/**",
    "!src/react-app-env.d.ts",
  ],
};

export default config;
