import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {ChatMessage} from "../../entities/ChatMessage";

@Injectable({
  providedIn: 'root',
})
export class SocketService<T> {
  private socket: WebSocket | undefined;
  private messageSubject: Subject<any> = new Subject<any>();
  private openData: Subject<any> = new Subject<any>();

  constructor() {}

  // Connect to the WebSocket server
  connect(url: string): void {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket already open or connecting.');
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
      console.log('WebSocket is connected:', event);
    };

    this.socket.onopen = (event) => {
      this.openData.next(event);
    }

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
  sendMessage(message: ChatMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const obj = {
        action: 'sendmessage',
        message: message
      }
      this.socket.send(JSON.stringify(obj));
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
          const parsedData: any = JSON.parse(data);
          observer.next(parsedData.message as T);
        } catch (error) {
          observer.error('Failed to parse WebSocket message: ' + error);
        }
      });
    });
  }

  onOpen<T>(): Observable<T> {
    return new Observable<T>((observer) => {
      this.openData.asObservable().subscribe((data) => {
        try {
          observer.next(data);
        } catch (error) {
          observer.error('Failed to parse WebSocket message: ' + error);
        }
      });
    });
  }

  // Close the WebSocket connection
  closeConnection(): void {
    if (this.socket) {
      console.log('Closing socket. Ready state:', this.socket.readyState); // 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
      this.socket.close();
      console.log('WebSocket connection closed.');
    } else {
      console.warn('Socket is undefined or null!');
    }
  }
}
