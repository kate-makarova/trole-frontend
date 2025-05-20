# Trole Frontend E2E Testing

This directory contains end-to-end tests for the Trole Frontend application using Cypress.

## Test Structure

The tests are organized into the following categories:

- **Authentication Tests** (`e2e/auth.cy.js`): Tests for login, logout, and session management
- **Chat Functionality Tests** (`e2e/chat.cy.js`): Tests for chat rooms, messaging, and related features
- **Navigation and UI Tests** (`e2e/navigation.cy.js`): Tests for navigation, responsive design, and UI components

## Running Tests

### Prerequisites

- Node.js and npm installed
- Trole Frontend application running locally on port 4200
- Trole Backend API running locally on port 8000

### Commands

- **Open Cypress Test Runner**: `npx cypress open`
- **Run All Tests Headlessly**: `npx cypress run`
- **Run Specific Test File**: `npx cypress run --spec "cypress/e2e/auth.cy.js"`

## Visual Regression Testing

The tests include visual regression testing using the `cypress-visual-regression` plugin.

### How It Works

1. First run creates baseline screenshots in `cypress/snapshots/base`
2. Subsequent runs compare new screenshots with the baseline
3. Differences are highlighted in `cypress/snapshots/diff`

### Commands

- **Update Baseline Screenshots**: `npx cypress run --env updateSnapshots=true`
- **View Differences**: Open the HTML files in `cypress/snapshots/diff` in a browser

## Custom Commands

The tests use several custom commands defined in `cypress/support/commands.js`:

- `cy.login(email, password)`: Logs in with the specified credentials
- `cy.takeSnapshot(name)`: Takes a screenshot for visual regression testing
- `cy.navigateToChatRoom(roomId)`: Navigates to a specific chat room
- `cy.sendChatMessage(message)`: Sends a message in the current chat room

## Adding New Tests

When adding new tests:

1. Follow the existing patterns and naming conventions
2. Use data-cy attributes for element selection (e.g., `[data-cy=login-button]`)
3. Include visual regression snapshots for important UI states
4. Add appropriate assertions to verify functionality

## Troubleshooting

- **Tests Failing Due to Timing Issues**: Increase timeouts or add explicit waits
- **Visual Regression Failures**: Check if UI changes were intentional and update baselines if needed
- **Authentication Issues**: Ensure the test user exists in the backend database