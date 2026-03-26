// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Next.js HMR (hot module replacement) can emit chunks with syntax that the browser
// flags as invalid while a live-reload is in flight. These errors are non-critical and
// unrelated to test assertions, so we suppress them to avoid flaky test failures in
// dev mode. In CI the app runs as a production build (yarn build && yarn start), so
// this handler never fires there.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Invalid or unexpected token')) {
    return false;
  }
});