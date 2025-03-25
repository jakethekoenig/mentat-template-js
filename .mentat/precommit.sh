#!/bin/bash

# Run prettier to format code
npm run format

# Run ESLint with auto-fix
npm run lint -- --fix

# Run client tests
npm test --prefix client

# Run server API tests only, but allow passing with no tests
# Since we're excluding the app serving test that requires the client to be built
cd server && npx jest --testPathIgnorePatterns="app\.test\.ts$" --passWithNoTests
