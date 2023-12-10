import { ISocket } from './ISocket';
import { IRoom } from './IRoom';

export interface ISocketManeger {
  handleConnections(): void;
  onConnect(socket: ISocket): void;
  onMessage(socket: ISocket, message: string): void;
  getAvailableRoomId(): string | null;
  createRoom(): IRoom;
}