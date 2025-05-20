// ***********************************************
// This file defines custom commands for Cypress.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Login command to simplify authentication in tests
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-cy=email-input]').type(email);
  cy.get('[data-cy=password-input]').type(password);
  cy.get('[data-cy=login-button]').click();
  
  // Wait for login to complete
  cy.url().should('not.include', '/login');
});

// Command to take a visual snapshot for regression testing
Cypress.Commands.add('takeSnapshot', (name) => {
  cy.document().then((doc) => {
    // Wait for any animations to complete
    cy.wait(500);
    cy.compareSnapshot(name);
  });
});

// Command to navigate to a chat room
Cypress.Commands.add('navigateToChatRoom', (roomId) => {
  cy.visit(`/chat/${roomId}`);
  cy.get('[data-cy=chat-messages]').should('be.visible');
});

// Command to send a message in a chat
Cypress.Commands.add('sendChatMessage', (message) => {
  cy.get('[data-cy=message-input]').type(message);
  cy.get('[data-cy=send-button]').click();
  
  // Verify message was sent
  cy.contains(message).should('be.visible');
});