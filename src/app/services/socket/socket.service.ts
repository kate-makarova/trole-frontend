import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService<T> {
  private socket: WebSocket | undefined;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {}

  // Connect to the WebSocket server
  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
      console.log('WebSocket is connected:', event);
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      // Push the incoming message into the observable stream
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket is closed:', event);
    };
  }

  // Send a message to the WebSocket server
  sendMessage(message: object): void {
    console.log(this.socket)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  // Receive messages as an Observable
  onMessage<T>(): Observable<T> {
    return new Observable<T>((observer) => {
      this.messageSubject.asObservable().subscribe((data) => {
        try {
          // Assuming the data comes as a string, try to parse it
          const parsedData: T = JSON.parse(data);
          observer.next(parsedData);
        } catch (error) {
          observer.error('Failed to parse WebSocket message: ' + error);
        }
      });
    });
  }

  // Close the WebSocket connection
  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket connection closed.');
    }
  }
}
