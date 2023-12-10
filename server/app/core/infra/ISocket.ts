import { SocketEvent } from "@core/enums/SocketEvent";

export interface ISocket {
    send(data: any): void;
    on(event: SocketEvent, callback: (...args: any[]) => void): void;
  }