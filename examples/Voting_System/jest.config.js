module.exports = {
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json",
      },
    },
    testPathIgnorePatterns: [
      "<rootDir>/.next/",
      "<rootDir>/node_modules/",
      "<rootDir>/dist",
      "<rootDir>/tests/contracts/",
    ],
    moduleNameMapper: {
      "\\.(scss|sass|css)$": "identity-obj-proxy",
    },
    transform: { "\\.ts$": ["ts-jest"], "\\.tsx$": ["ts-jest"] },
    testTimeout: 20000,
    testEnvironment: "jsdom",
    transformIgnorePatterns: ["/node_modules/"],
  };