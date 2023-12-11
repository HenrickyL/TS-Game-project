import { IManeger } from "@core/infra";
import {IConnectClient, IMessage, IConnectGame} from "@core/DTOs"
import { PlayerStatus, SocketEvent } from "@enums/index";

import {WebSocketServer, WebSocket} from 'ws'
import { Game } from "@core/entities/Game";
import { Player } from "@core/entities/Player";
import { GameStatus } from "@core/enums/GameStatus";

export class WebSocketManager implements IManeger<WebSocket>{
    private wss: WebSocketServer
    private connectedSockets: Map<string, Player>;

    private clientQueue : Player[] = [];
    private rooms: Map<string, Game>;

    constructor(server : any){
        this.wss = new WebSocket.Server({server});
        this.connectedSockets = new Map<string, Player>();
        this.rooms = new Map<string, Game>();
        this.handleConnections();
    }

    get Rooms() : Map<string, Game> {
        return this.rooms
    }

    handleConnections(): void {
        this.wss.on(SocketEvent.CONNECTION, (ws: WebSocket) => {
            this.onConnect(ws);
            this.onDisconnect(ws);
        });
    }

    

    onConnect(socket: WebSocket): void {
        // Lógica a ser executada quando uma conexão é estabelecida
        const player = this.createPlayer(socket)
        this.logClient(player.Id, "Nova conexão estabelecida.")
        this.checkRoomAvailability()
        // Lidar com eventos de mensagem recebida
        socket.on(SocketEvent.MESSAGE, (message: string) => {
            this.onMessage(socket, message);
        });
    }
    onDisconnect(socket: WebSocket): void {
        socket.on(SocketEvent.CLOSE, () => {
            // Remover o cliente desconectado usando a busca reversa
            this.closeGame(socket)
        });
    }

    onMessage(socket: WebSocket, message: string): void {
        const player = this.getPlayerBySocket(socket);
        this.logClient(player?.Id || 'undefined' ,`Mensagem recebida: ${message}`);
    }
    getAvailableRoomId(): string | null {
        throw new Error("Method not implemented.");
    }

    sendMessageToAll(message: string, data: any): void {
        this.connectedSockets.forEach((player) => {
            if (player.Socket.readyState === WebSocket.OPEN) {
                const socket = player.Socket
                this.send(socket, SocketEvent.MESSAGE, message, data)
                socket.send(message);
            }
        });
    }

    getPlayerBySocket(socket: WebSocket): Player | null {
        for (const [clientId, player] of this.connectedSockets.entries()) {
            if (player.Socket === socket) {
                return player
            }
        }
        return null
    }

    checkRoomAvailability(): void {
        if (this.clientQueue.length >= 2) {
            const game = this.createGame()
            game.Players.forEach(player=>{
                const data: IConnectGame = {
                    gameId: game.Id,
                    status: game.Status
                }
                this.send(player.Socket, PlayerStatus.CONNECTED, "Você se conectou a um jogo", data)
            })
            this.logRoom(game.Id, "Sala Criada")
        }
    }

    

    removeFromQueue(socket: WebSocket): void {
        const player = this.getPlayerBySocket(socket);
        if (player !== null) {
            const index = this.clientQueue.indexOf(player)
            if(index != -1)
                this.clientQueue.splice(index, 1);
        }
    }

    logClient(clientId: string, message: string): void{
        console.log(`[id:${clientId}] ${message}`);
    }
    
    logRoom(roomId: string, message: string): void{
        console.log(`<id:${roomId}> ${message}`);
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

    private closeGame(socket: WebSocket):void{
        const player = this.getPlayerBySocket(socket)
        if (player) {
            this.connectedSockets.delete(player.Id);
            player.SetStatus(PlayerStatus.DISCONNECTED)
            this.logClient(player.Id,"Cliente desconectado.")
            this.removeFromQueue(socket);
            const game = player.Game
            if(game && game.Status != GameStatus.STOP){
                game.setStatus(GameStatus.STOP)
                game.Players.forEach(player=>{
                    this.send(player.Socket, GameStatus.STOP,"Seu inimigo se desconectou",  null)
                })
                this.logRoom(game.Id,"Game Close - player left")
            }
        }
    }

    private createGame(): Game{
        const players = this.clientQueue.splice(0, 2); // Retira 2 clientes da fila
        const game = new Game();
        const roomId = game.Id
        this.rooms.set(roomId, game);
        players.forEach(player=>{
            game.addPlayer(player)
            player.SetGame(game)
        })
        return game
    }

    private createPlayer(socket: WebSocket): Player{
        const player = new Player(socket);
        const clientId : string = player.Id
        this.connectedSockets.set(clientId, player);

        player.SetStatus(PlayerStatus.CONNECTED)

        const response: IConnectClient = {
            clientId: clientId,
            status: player.Status
        }
        this.send(socket, SocketEvent.CONNECTION, 'welcome, wait join room', response)
        
        this.clientQueue.push(player)
        return player
    }
}