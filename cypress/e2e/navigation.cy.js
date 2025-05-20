// Navigation and UI E2E Tests

describe('Navigation and UI', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('user@example.com', 'password123');
  });

  it('should navigate between main sections', () => {
    // Start at dashboard
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
    cy.takeSnapshot('dashboard');
    
    // Navigate to chat
    cy.get('[data-cy=nav-chat]').click();
    cy.url().should('include', '/chat');
    cy.takeSnapshot('chat-from-nav');
    
    // Navigate to profile
    cy.get('[data-cy=nav-profile]').click();
    cy.url().should('include', '/profile');
    cy.takeSnapshot('profile-from-nav');
    
    // Navigate to settings
    cy.get('[data-cy=nav-settings]').click();
    cy.url().should('include', '/settings');
    cy.takeSnapshot('settings-from-nav');
  });

  it('should toggle sidebar on mobile view', () => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    cy.visit('/dashboard');
    
    // Sidebar should be hidden by default on mobile
    cy.get('[data-cy=sidebar]').should('not.be.visible');
    
    // Open sidebar
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar]').should('be.visible');
    cy.takeSnapshot('mobile-sidebar-open');
    
    // Close sidebar
    cy.get('[data-cy=sidebar-close]').click();
    cy.get('[data-cy=sidebar]').should('not.be.visible');
  });

  it('should display user profile modal', () => {
    cy.visit('/dashboard');
    
    // Open user menu and click profile
    cy.get('[data-cy=user-menu]').click();
    cy.get('[data-cy=profile-button]').click();
    
    // Modal should be visible
    cy.get('[data-cy=profile-modal]').should('be.visible');
    cy.takeSnapshot('profile-modal');
    
    // Close modal
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=profile-modal]').should('not.exist');
  });

  it('should show notifications', () => {
    cy.visit('/dashboard');
    
    // Open notifications
    cy.get('[data-cy=notifications-button]').click();
    
    // Notification panel should be visible
    cy.get('[data-cy=notifications-panel]').should('be.visible');
    cy.takeSnapshot('notifications-panel');
    
    // Close notifications
    cy.get('[data-cy=notifications-close]').click();
    cy.get('[data-cy=notifications-panel]').should('not.be.visible');
  });

  it('should handle breadcrumb navigation', () => {
    // Navigate to a deep page
    cy.visit('/settings/account/security');
    
    // Breadcrumbs should be visible
    cy.get('[data-cy=breadcrumbs]').should('be.visible');
    
    // Click on a breadcrumb to navigate up
    cy.get('[data-cy=breadcrumb-item]').contains('Account').click();
    cy.url().should('include', '/settings/account');
    cy.url().should('not.include', '/security');
    
    cy.takeSnapshot('breadcrumb-navigation');
  });

  it('should be responsive across different screen sizes', () => {
    // Test on desktop
    cy.viewport(1200, 800);
    cy.visit('/dashboard');
    cy.takeSnapshot('desktop-view');
    
    // Test on tablet
    cy.viewport('ipad-2');
    cy.visit('/dashboard');
    cy.takeSnapshot('tablet-view');
    
    // Test on mobile
    cy.viewport('iphone-x');
    cy.visit('/dashboard');
    cy.takeSnapshot('mobile-view');
  });

  it('should show loading states', () => {
    // Intercept API request to simulate loading
    cy.intercept('GET', '**/api/dashboard-data', (req) => {
      req.on('response', (res) => {
        // Delay the response to show loading state
        res.setDelay(2000);
      });
    }).as('dashboardData');
    
    cy.visit('/dashboard');
    
    // Should show loading indicator
    cy.get('[data-cy=loading-indicator]').should('be.visible');
    cy.takeSnapshot('loading-state');
    
    // Wait for data to load
    cy.wait('@dashboardData');
    
    // Loading indicator should disappear
    cy.get('[data-cy=loading-indicator]').should('not.exist');
  });
});