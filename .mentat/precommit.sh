#!/bin/bash

# Run prettier to format code
npm run format

# Run ESLint with auto-fix
npm run lint -- --fix

# Run tests for both client and server
# Include this because we don't have information about CI
npm test
