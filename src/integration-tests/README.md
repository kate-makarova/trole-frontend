# Integration Tests

This directory contains integration tests for the Trole Frontend application. Unlike unit tests, which test individual components and services in isolation, integration tests verify that different parts of the application work together correctly.

## Running the Tests

Integration tests are run using the same command as unit tests:

```bash
npm test
```

To run only the integration tests:

```bash
npm test -- --include="src/integration-tests/**/*.spec.ts"
```

## Test Structure

Each integration test file focuses on a specific user flow or feature area. The tests verify that components interact correctly with services and with each other.

### Current Test Files

- **chat-flow.integration.spec.ts**: Tests the interaction between the ChatComponent and SingleSocketChatService, covering the critical user flow of loading chats, switching between chats, and sending messages.

## Writing Integration Tests

When writing integration tests:

1. Focus on component interactions rather than isolated behavior
2. Mock external dependencies (HTTP, WebSockets) but use real services and components for the parts being tested
3. Test complete user flows from start to finish
4. Use `fakeAsync` and `tick()` for testing asynchronous operations
5. Verify both the UI state and the service calls

## Example

Here's a simplified example of an integration test:

```typescript
describe('Feature Integration', () => {
  let componentA: ComponentA;
  let componentB: ComponentB;
  let service: MyService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentA, ComponentB],
      providers: [MyService]
    }).compileComponents();
    
    componentA = TestBed.createComponent(ComponentA).componentInstance;
    componentB = TestBed.createComponent(ComponentB).componentInstance;
    service = TestBed.inject(MyService);
  });
  
  it('should update componentB when componentA triggers an action', fakeAsync(() => {
    // Arrange
    spyOn(service, 'doSomething').and.callThrough();
    
    // Act
    componentA.triggerAction();
    tick(); // Process async operations
    
    // Assert
    expect(service.doSomething).toHaveBeenCalled();
    expect(componentB.someProperty).toBe(expectedValue);
  }));
});
```