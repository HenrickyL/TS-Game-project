import { Player } from "@core/entities/Player";

export interface ISocketManeger<ISocket>{
  handleConnections(): void;

  onConnect(socket: ISocket): void;
  onDisconnect(socket: ISocket): void;
  
  onMessage(socket: ISocket, message: string): void;
  sendMessageToAll(message: string, data: any): void
  getPlayerBySocket(socket: ISocket): Player  | null
}