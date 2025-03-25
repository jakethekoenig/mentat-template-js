#!/bin/bash

# Run prettier to format code
npm run format

# Run ESLint with auto-fix
npm run lint -- --fix

# Run client tests
npm test --prefix client

# Run server API tests only, skipping the React app serving test
# The app serving test fails because it needs the client to be built first
cd server && npx jest --testPathIgnorePatterns=app.test.ts
