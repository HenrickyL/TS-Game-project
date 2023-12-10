import { IRoom } from "@core/infra/IRoom";
import { SocketEvent } from "@enums/index";
import {ISocketManeger} from "@core/infra/ISocketManeger"

import {WSWebSocket} from "./WSWebSocket"
import {WebSocketServer, WebSocket} from 'ws'

export class WebSocketManager implements ISocketManeger{
    private wss: WebSocketServer
    private rooms: IRoom[];

    constructor(server : any){
        this.wss = new WebSocket.Server({server});
        this.rooms = [];

        this.handleConnections();
    }

    handleConnections(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            const socket = new WSWebSocket(ws); // Cria uma instância de WSWebSocket
            this.onConnect(socket);
        });
    }
    onConnect(socket: WSWebSocket): void {
        socket.on(SocketEvent.MESSAGE, (message: string) => {
            this.onMessage(socket, message);
          });
    }
    onMessage(socket: WSWebSocket, message: string): void {
        console.log(`Mensagem recebida: ${message}`);
    }
    getAvailableRoomId(): string | null {
        throw new Error("Method not implemented.");
    }
    createRoom(): IRoom {
        const roomId = Math.random().toString(36).substring(7);
        const newRoom: IRoom = { id: roomId, clients: [] };
        this.rooms.push(newRoom);
        return newRoom;
    }

}