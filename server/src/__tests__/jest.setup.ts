// Set test environment variables if needed
process.env.NODE_ENV = 'test';

// Set CI environment variable for GitHub Actions
if (process.env.GITHUB_ACTIONS) {
  process.env.CI = 'true';
}

// Increase timeout for all tests (if needed)
jest.setTimeout(10000);
