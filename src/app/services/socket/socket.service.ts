import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket;

  constructor(address: string) {
    this.socket = io(address);
  }

  emit<T>(event: string, data: T) {
    this.socket.emit(event, data);
  }

  on<T>(event: string, callback: Function): void {
    this.socket.on(event, (data: T) => {
      callback(data)
    });
  }
}
