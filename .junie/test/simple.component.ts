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