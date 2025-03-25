import request from 'supertest';
import { app } from '../app';
import fs from 'fs';
import path from 'path';
import { CLIENT_DIST_PATH } from '../app';

describe('API Endpoints', () => {
  it('should return welcome message on GET /api', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to the Mentat API!');
  });

  // Skip the static file test in CI environments where the client files aren't built
  (process.env.CI ? it.skip : it)(
    'should serve the React app on GET /',
    async () => {
      // Check if the client dist directory exists first
      const indexPath = path.join(CLIENT_DIST_PATH, 'index.html');
      const clientDistExists = fs.existsSync(CLIENT_DIST_PATH);
      const indexExists = fs.existsSync(indexPath);

      // If the client dist directory or index.html doesn't exist, create a temporary test HTML file
      if (!clientDistExists || !indexExists) {
        // Skip this test since we can't properly test it without the client build
        console.log(
          'Skipping test: client/dist directory or index.html not found'
        );
        return;
      }

      // Only run this test if we have the necessary files
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.header['content-type']).toContain('text/html');
    }
  );
});
