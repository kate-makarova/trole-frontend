// Chat Functionality E2E Tests

describe('Chat Functionality', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('user@example.com', 'password123');
  });

  it('should display list of chat rooms', () => {
    cy.visit('/chat');
    cy.get('[data-cy=chat-room-list]').should('be.visible');
    cy.get('[data-cy=chat-room-item]').should('have.length.at.least', 1);
    
    // Visual regression test
    cy.takeSnapshot('chat-room-list');
  });

  it('should open a chat room and display messages', () => {
    // Navigate to first chat room
    cy.visit('/chat');
    cy.get('[data-cy=chat-room-item]').first().click();
    
    // Should show chat interface
    cy.get('[data-cy=chat-messages]').should('be.visible');
    cy.get('[data-cy=message-input]').should('be.visible');
    cy.get('[data-cy=send-button]').should('be.visible');
    
    cy.takeSnapshot('chat-room-view');
  });

  it('should send a message in a chat room', () => {
    // Navigate to a specific chat room (using custom command)
    cy.navigateToChatRoom('room-1');
    
    // Send a message
    const message = `Test message ${Date.now()}`;
    cy.sendChatMessage(message);
    
    // Message should appear in the chat
    cy.get('[data-cy=chat-messages]').contains(message).should('be.visible');
    
    cy.takeSnapshot('after-sending-message');
  });

  it('should display user typing indicator', () => {
    cy.navigateToChatRoom('room-1');
    
    // Start typing
    cy.get('[data-cy=message-input]').type('Hello');
    
    // Should show typing indicator for current user
    cy.get('[data-cy=typing-indicator]').should('be.visible');
    
    cy.takeSnapshot('typing-indicator');
  });

  it('should load more messages when scrolling up', () => {
    cy.navigateToChatRoom('room-1');
    
    // Get initial message count
    cy.get('[data-cy=chat-message]').then($initialMessages => {
      const initialCount = $initialMessages.length;
      
      // Scroll to top to load more messages
      cy.get('[data-cy=chat-messages]').scrollTo('top');
      
      // Wait for new messages to load
      cy.wait(1000);
      
      // Should have more messages than before
      cy.get('[data-cy=chat-message]').should('have.length.greaterThan', initialCount);
    });
    
    cy.takeSnapshot('after-loading-more-messages');
  });

  it('should allow searching messages in a chat room', () => {
    cy.navigateToChatRoom('room-1');
    
    // Open search
    cy.get('[data-cy=search-button]').click();
    
    // Enter search term
    cy.get('[data-cy=search-input]').type('hello');
    cy.get('[data-cy=search-submit]').click();
    
    // Should highlight search results
    cy.get('[data-cy=search-result]').should('be.visible');
    
    cy.takeSnapshot('message-search-results');
  });

  it('should allow creating a new chat room', () => {
    cy.visit('/chat');
    
    // Click create new room button
    cy.get('[data-cy=create-room-button]').click();
    
    // Fill in room details
    const roomName = `Test Room ${Date.now()}`;
    cy.get('[data-cy=room-name-input]').type(roomName);
    cy.get('[data-cy=create-room-submit]').click();
    
    // Should show the new room
    cy.get('[data-cy=chat-room-list]').contains(roomName).should('be.visible');
    
    cy.takeSnapshot('after-creating-room');
  });
});