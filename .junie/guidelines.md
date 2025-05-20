# Trole Frontend Development Guidelines

This document provides essential information for developers working on the Trole Frontend project.

## Build/Configuration Instructions

### Environment Setup

The project uses Angular's environment configuration system with two environments:

- **Production**: Uses `environment.ts` with API endpoint at `https://api.trole.online/api/`
- **Development**: Uses `environment.development.ts` with API endpoint at `http://127.0.0.1:8000/api/`

To add new environment variables:
1. Add them to both environment files
2. Import the environment in your service/component: `import { environment } from 'src/environments/environment'`
3. Access variables using `environment.variableName`

### Build Commands

- **Development Server**: `npm run start_dev` - Starts the development server with hot reload
- **Production Build**: `npm run build` - Creates a production build in the `dist/` directory
- **Watch Mode**: `npm run watch` - Builds and watches for changes in development mode

### Internationalization

The project supports multiple languages (English and Russian) using Angular's i18n system:
- Source locale is en-US
- Russian translations are in `src/locale/messages.ru.xlf`

## Testing Information

### Running Tests

- **All Tests**: `npm test` - Runs all tests with Karma
- **Specific Test**: `npm test -- --include="path/to/test.spec.ts"` - Runs a specific test file
- **With Coverage**: `npm test -- --code-coverage` - Generates coverage reports in the `coverage/` directory

### Writing Tests

Tests follow the standard Angular testing pattern using Jasmine and Karma:

1. **Component Tests**: Test files should be named `component-name.component.spec.ts` and placed alongside the component
2. **Service Tests**: Test files should be named `service-name.service.spec.ts` and placed alongside the service

### Example Component Test

Here's a simple example of a component test:

```typescript
// simple.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  template: '<div>{{ message }}</div>',
  standalone: true
})
export class SimpleComponent {
  message = 'Hello, Trole!';

  updateMessage(newMessage: string): void {
    this.message = newMessage;
  }
}

// simple.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleComponent } from './simple.component';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hello, Trole!');
  });

  it('should update the message when updateMessage is called', () => {
    const newMessage = 'Updated message';
    component.updateMessage(newMessage);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(newMessage);
  });
});
```

### Testing Services with Dependencies

When testing services with dependencies, use TestBed to provide mock dependencies:

```typescript
describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyService]
    });
    
    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data', () => {
    const testData = { id: 1, name: 'Test' };
    
    service.getData().subscribe(data => {
      expect(data).toEqual(testData);
    });
    
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
```

## Additional Development Information

### State Management

The project uses NgRx for state management. When adding new features:
1. Define actions in a separate file (e.g., `user.actions.ts`)
2. Create reducers to handle state changes
3. Use selectors to access state in components
4. Consider using the Effect pattern for side effects

### WebSocket Communication

The project uses Socket.IO for real-time communication:
1. The `SingleSocketChatService` handles chat-related WebSocket communication
2. WebSocket connections are established when needed and cleaned up when no longer required
3. Use observables to subscribe to WebSocket events

### Code Style Guidelines

- Use standalone components where possible
- Follow Angular's style guide for naming conventions
- Use TypeScript's strict mode
- Properly manage RxJS subscriptions (use `takeUntil` or async pipe)
- Document public methods and complex logic with JSDoc comments

### Debugging Tips

- Use Angular DevTools browser extension for debugging
- Check the Network tab in browser DevTools for API calls
- For WebSocket issues, monitor the Socket.IO connection in the Console
- Use the Redux DevTools extension to inspect NgRx state changes