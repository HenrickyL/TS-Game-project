import { IRoom } from './IRoom';

export interface ISocketManeger<ISocket>{
  handleConnections(): void;
  onConnect(socket: ISocket): void;
  onDisconnect(socket: ISocket): void;
  onMessage(socket: ISocket, message: string): void;
  getAvailableRoomId(): string | null;
  createRoom(): IRoom;
  sendMessageToAll(message: string): void
}