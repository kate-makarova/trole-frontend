const { defineConfig } = require('cypress');
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Visual regression testing setup
      getCompareSnapshotsPlugin(on, config);
      
      // Return the config object
      return config;
    },
  },
  
  // Configure screenshots for visual testing
  screenshotsFolder: 'cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
  
  env: {
    // Visual regression testing configuration
    visualRegressionType: 'regression',
    failSilently: false,
    
    // Snapshot directories
    SNAPSHOT_BASE_DIRECTORY: 'cypress/snapshots/base',
    SNAPSHOT_DIFF_DIRECTORY: 'cypress/snapshots/diff',
    
    // API URL for tests
    apiUrl: 'http://127.0.0.1:8000/api/',
  },
});