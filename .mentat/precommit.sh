#!/bin/bash

# Run prettier to format code
npm run format

# Run ESLint with auto-fix
npm run lint -- --fix

# Build the project (client and server)
npm run build

# Run all tests
npm test
