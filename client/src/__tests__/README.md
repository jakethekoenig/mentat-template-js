# React Tests with Vitest

This directory contains tests for React components using Vitest and React Testing Library.

## Running Tests

To run all tests once:

```
npm run test
```

To run tests in watch mode (tests rerun when files change):

```
npm run test:watch
```

## Test Files

- `App.test.tsx`: Tests for the main App component

## Writing New Tests

1. Create a new test file with the `.test.tsx` extension in this directory
2. Import the necessary testing utilities:
   ```typescript
   import { describe, it, expect, vi } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```
3. Import the component you want to test
4. Write your tests using the describe/it pattern

Example:

```typescript
describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });
});
```

## Testing Best Practices

- Test behavior, not implementation
- Use user-centric queries (getByRole, getByText, etc.)
- Mock external dependencies and services
- Test edge cases and error conditions
- Keep tests fast and independent
