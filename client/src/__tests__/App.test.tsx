import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Define types
type ApiResponse = {
  message: string;
};

// Mock the fetch API
globalThis.fetch = vi.fn() as unknown as typeof fetch;

function mockFetchResponse(data: ApiResponse) {
  return {
    json: vi.fn().mockResolvedValue(data),
    ok: true,
  };
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    (globalThis.fetch as unknown as Mock).mockResolvedValue(
      mockFetchResponse({ message: 'Test Message from API' })
    );
  });

  it('renders App component correctly', () => {
    render(<App />);
    expect(screen.getByText('Mentat Javascript Template')).toBeInTheDocument();
    expect(
      screen.getByText(/Frontend: React, Typescript, Vite/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Backend: Node.js, Express, Typescript/)
    ).toBeInTheDocument();
  });

  it('loads and displays API message', async () => {
    render(<App />);

    // Should initially show loading message
    expect(screen.getByText(/Loading message from server/)).toBeInTheDocument();

    // Wait for the fetch to resolve and check if the message is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Message from API')).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith('/api');
  });

  it('handles API error', async () => {
    // Mock a failed API call
    (globalThis.fetch as unknown as Mock).mockRejectedValue(
      new Error('API Error')
    );

    render(<App />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument();
    });
  });

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Get the button
    const button = screen.getByText(/count is 0/);

    // Click the button
    await user.click(button);

    // Check if the count has been incremented
    expect(screen.getByText(/count is 1/)).toBeInTheDocument();
  });
});
