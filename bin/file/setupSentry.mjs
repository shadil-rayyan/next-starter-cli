import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function setupSentry() {
  console.log('Setting up Sentry for error tracking...');

  // Install Sentry packages
  execSync('npm install @sentry/cli @sentry/nextjs', { stdio: 'inherit' });

  // Create sentry.client.config.js
  const sentryClientConfig = `
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
  `;
  fs.writeFileSync('sentry.client.config.js', sentryClientConfig.trim());

  // Create sentry.server.config.js
  const sentryServerConfig = `
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
  `;
  fs.writeFileSync('sentry.server.config.js', sentryServerConfig.trim());

  // Update next.config.js to include Sentry configuration
  const nextConfigPath = 'next.config.js';
  const sentryConfig = `
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports here
};

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
  `;

  if (fs.existsSync(nextConfigPath)) {
    fs.writeFileSync(nextConfigPath, sentryConfig.trim());
  } else {
    fs.writeFileSync(nextConfigPath, sentryConfig.trim());
  }

  console.log('Sentry setup completed.');
}