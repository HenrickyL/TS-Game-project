import { SocketEvent } from '@core/enums';
import { ISocket } from '@core/infra';

import {WebSocket} from 'ws';


export class WSWebSocket implements ISocket {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  send(data: any): void {
    this.socket.send(data);
  }
  on(event: SocketEvent, callback: (...args: any[]) => void): void {
    this.socket.on(event, callback);
  }
}