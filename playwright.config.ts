import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  fullyParallel: true,
  retries: 1, 
  reporter: 'html',
  use: {
   
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }

    // {
    //   name: 'mobile-chrome', 
    //   use: { ...devices['iPhone 14']}
    // },
    
    // { name: 'mobile-safari', 
    //  use: {...devices['iPhone 14']}
    // }
    ],
    
});

