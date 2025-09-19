// jest.config.js
module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/utils/jest.env.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/utils/jest.db.setup.js"],
  // run tests in-band if you prefer simpler DB cleanup
  // runInBand: true,
};
