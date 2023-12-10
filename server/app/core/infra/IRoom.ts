import { ISocket } from "./ISocket";

export interface IRoom {
  id: string;
  clients: ISocket[];
}