/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular'

export default defineConfig(({ mode }) => ({
  cacheDir: '../../.vite/front-end-angular',
  plugins: [angular(), nxViteTsPaths()],
  test: {
    allowOnly: mode !== 'ci',
    browser: {
      enabled: true,
      headless: true,
      isolate: true,
      name: 'chromium',
      provider: 'playwright',
    },
    coverage: {
      include: ['./src/app/**/*.ts'],
      enabled: true,
      exclude: ['**/index.ts', '**/app.config.ts', 'testing/**'],
      provider: 'istanbul',
      reporter: ['text-summary', 'html'],
      reportsDirectory: '../../reports/front-end-angular/coverage',
      thresholds: {
        autoUpdate: false,
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    clearMocks: true,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    exclude: [],
    name: 'front-end-angular',
    open: mode !== 'ci',
    outputFile: '../../reports/front-end-angular/vite/index.html',
    reporters: ['dot', 'html'],
    root: __dirname,
    sequence: {
      shuffle: true,
    },
    setupFiles: ['./src/testing/setup-test.ts'],
    ui: mode !== 'ci',
    uiBase: '/',
  },
}));
