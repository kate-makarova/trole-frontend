// Authentication E2E Tests

describe('Authentication', () => {
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should display login page', () => {
    cy.visit('/login');
    cy.get('[data-cy=email-input]').should('be.visible');
    cy.get('[data-cy=password-input]').should('be.visible');
    cy.get('[data-cy=login-button]').should('be.visible');
    
    // Visual regression test
    cy.takeSnapshot('login-page');
  });

  it('should show error with invalid credentials', () => {
    cy.visit('/login');
    cy.get('[data-cy=email-input]').type('invalid@example.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=login-button]').click();
    
    // Should show error message
    cy.get('[data-cy=error-message]').should('be.visible');
    cy.takeSnapshot('login-error');
  });

  it('should login successfully with valid credentials', () => {
    // Using custom login command
    cy.login('user@example.com', 'password123');
    
    // Should redirect to dashboard after login
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=user-menu]').should('be.visible');
    cy.takeSnapshot('after-login');
  });

  it('should logout successfully', () => {
    // Login first
    cy.login('user@example.com', 'password123');
    
    // Perform logout
    cy.get('[data-cy=user-menu]').click();
    cy.get('[data-cy=logout-button]').click();
    
    // Should redirect to login page
    cy.url().should('include', '/login');
    cy.takeSnapshot('after-logout');
  });

  it('should maintain session after page refresh', () => {
    // Login
    cy.login('user@example.com', 'password123');
    
    // Refresh the page
    cy.reload();
    
    // Should still be logged in
    cy.get('[data-cy=user-menu]').should('be.visible');
  });

  it('should redirect to login when accessing protected route while logged out', () => {
    cy.visit('/dashboard');
    
    // Should redirect to login
    cy.url().should('include', '/login');
  });
});