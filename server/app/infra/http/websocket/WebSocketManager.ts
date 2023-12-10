import { IRoom } from "@core/infra/IRoom";
import { SocketEvent } from "@enums/index";
import {ISocketManeger} from "@core/infra/ISocketManeger"

import {WebSocketServer, WebSocket} from 'ws'
import { v4 as uuid } from 'uuid';

export class WebSocketManager implements ISocketManeger<WebSocket>{
    private wss: WebSocketServer
    private rooms: IRoom[];
    private connectedSockets: Map<string, WebSocket>;
    private socketToClientId: Map<WebSocket, string>

    constructor(server : any){
        this.wss = new WebSocket.Server({server});
        this.rooms = [];
        this.connectedSockets = new Map<string, WebSocket>();
        this.socketToClientId = new Map<WebSocket, string >();

        this.handleConnections();
    }

    handleConnections(): void {
        this.wss.on(SocketEvent.CONNECTION, (ws: WebSocket) => {
            this.onConnect(ws);
            this.onDisconnect(ws);
            
        });
    }

    log(clientId: string, message: string): void{
        console.log(`[id:${clientId}] ${message}`);
    }

    onConnect(socket: WebSocket): void {
        // Lógica a ser executada quando uma conexão é estabelecida
        const clientId : string = uuid()
        this.connectedSockets.set(clientId, socket);
        this.socketToClientId.set(socket, clientId);

        const jsonString = JSON.stringify({message:'Bem-vindo ao servidor WebSocket!'});
        this.log(clientId, "Nova conexão estabelecida.")

        // Envie uma mensagem de boas-vindas para o cliente
        socket.send(jsonString);

        // Lidar com eventos de mensagem recebida
        socket.on(SocketEvent.MESSAGE, (message: string) => {
            this.onMessage(socket, message);
        });
    }
    onDisconnect(socket: WebSocket): void {
        socket.on(SocketEvent.CLOSE, () => {
            // Remover o cliente desconectado usando a busca reversa
            const clientId = this.socketToClientId.get(socket);
            if (clientId) {
                this.connectedSockets.delete(clientId);
                this.socketToClientId.delete(socket);
                this.log(clientId,"Cliente desconectado.")
            }
        });
    }

    onMessage(socket: WebSocket, message: string): void {
        const clientId = this.socketToClientId.get(socket);
        this.log(clientId || 'undefined' ,`Mensagem recebida: ${message}`);
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

    sendMessageToAll(message: string): void {
        this.connectedSockets.forEach((socket) => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
            }
        });
    }
}