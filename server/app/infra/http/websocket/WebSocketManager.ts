import { IManeger } from "@core/infra";
import {IConnectClient, IMessage} from "@core/DTOs"
import { SocketEvent } from "@enums/index";

import {WebSocketServer, WebSocket} from 'ws'
import { v4 as uuid } from 'uuid';

export class WebSocketManager implements IManeger<WebSocket>{
    private wss: WebSocketServer
    private connectedSockets: Map<string, WebSocket>;
    private socketToClientId: Map<WebSocket, string>

    private clientQueue : WebSocket[] = [];
    private rooms: Map<string, WebSocket[]>;

    constructor(server : any){
        this.wss = new WebSocket.Server({server});
        this.connectedSockets = new Map<string, WebSocket>();
        this.socketToClientId = new Map<WebSocket, string >();
        this.rooms = new Map<string, WebSocket[]>();
        this.handleConnections();
    }

    get Rooms() : Map<string, WebSocket[]> {
        return this.rooms
    }

    handleConnections(): void {
        this.wss.on(SocketEvent.CONNECTION, (ws: WebSocket) => {
            this.onConnect(ws);
            this.onDisconnect(ws);
        });
    }

    send(socket: WebSocket, type: string, message: string, data: any){
        const response: IMessage = {
            type,
            message,
            data
        }
        const jsonString = JSON.stringify(response);
        socket.send(jsonString);
    }

    onConnect(socket: WebSocket): void {
        // Lógica a ser executada quando uma conexão é estabelecida
        const clientId : string = uuid()
        this.connectedSockets.set(clientId, socket);
        this.socketToClientId.set(socket, clientId);

        const response: IConnectClient = {
            clientId: clientId 
        }
        this.send(socket, SocketEvent.CONNECTION, 'Bem-vindo ao servidor WebSocket!', response)
        
        this.logClient(clientId, "Nova conexão estabelecida.")

        // Lidar com eventos de mensagem recebida
        socket.on(SocketEvent.MESSAGE, (message: string) => {
            this.onMessage(socket, message);
        });
    }
    onDisconnect(socket: WebSocket): void {
        socket.on(SocketEvent.CLOSE, () => {
            // Remover o cliente desconectado usando a busca reversa
            const clientId = this.getClientIdBySocket(socket)
            if (clientId) {
                this.connectedSockets.delete(clientId);
                this.socketToClientId.delete(socket);
                this.logClient(clientId,"Cliente desconectado.")
                this.removeFromQueue(socket);
            }
        });
    }

    onMessage(socket: WebSocket, message: string): void {
        const clientId = this.socketToClientId.get(socket);
        this.logClient(clientId || 'undefined' ,`Mensagem recebida: ${message}`);
    }
    getAvailableRoomId(): string | null {
        throw new Error("Method not implemented.");
    }

    sendMessageToAll(message: string, data: any): void {
        this.connectedSockets.forEach((socket) => {
            if (socket.readyState === WebSocket.OPEN) {
                this.send(socket, SocketEvent.MESSAGE, message, data)
                socket.send(message);
            }
        });
    }

    getClientIdBySocket(socket: WebSocket): string  | null {
        return this.socketToClientId.get(socket) || null
    }

    checkRoomAvailability(): void {
        if (this.clientQueue.length >= 2) {
            const players = this.clientQueue.splice(0, 2); // Retira 2 clientes da fila
            const roomId = uuid();
            this.logRoom(roomId, "Sala Criada")
            this.rooms.set(roomId, players);
            // Inicie o jogo com esses jogadores na sala roomId
        }
    }

    removeFromQueue(socket: WebSocket): void {
        const index = this.clientQueue.indexOf(socket);
        if (index !== -1) {
            this.clientQueue.splice(index, 1);
        }
    }

    logClient(clientId: string, message: string): void{
        console.log(`[id:${clientId}] ${message}`);
    }
    
    logRoom(roomId: string, message: string): void{
        console.log(`<id:${roomId}> ${message}`);
    }
}