import { IManeger } from "@core/infra";
import {IConnectClient, IMessage, IConnectGame, IJoin, IAction} from "@core/DTOs"
import { GameActions, PlayerStatus, SocketEvent } from "@enums/index";

import {WebSocketServer, WebSocket} from 'ws'
import { Game } from "@core/entities/Game";
import { Player } from "@core/entities/Player";
import { GameStatus } from "@core/enums/GameStatus";
import { WebSocketMessage } from "./WebSocketMessage";

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

    #existPlayer(player: Player){
        return this.clientQueue.map(p=>p.Socket).some(s=>player.Socket === s)
    }
    
    private registerPlayer(socket: WebSocket){
        const player = this.createPlayer(socket)
        this.logClient(player.Id, "Nova conexão estabelecida.")
        return player
    }
    onConnect(socket: WebSocket): void {
        // Lógica a ser executada quando uma conexão é estabelecida
        const player = this.registerPlayer(socket)
        // Lidar com eventos de mensagem recebida
        socket.on(SocketEvent.MESSAGE, (message: string) => {
            const dataObj = JSON.parse(message) as IMessage;
            switch(dataObj.type){
                case SocketEvent.START:
                    if(!this.#existPlayer(player)){
                        this.registerOnQueue(player)
                        this.onMessage(socket, `[${player.Id}] client in queue.`);
                    }
                    break;
                case SocketEvent.ACTION:
                    const data = dataObj.data as IAction
                    this.emitAction(player, data)
                    break;
                default:
                    this.onMessage(socket, message);
                    break
            }
        });
    }

    private saveGameStatus(player: Player, data: IAction){
        const game = player.Game
        if(game && data.actionType == GameActions.POINT){
            player.setScore(player.Score+1)
        }
    }
    private emitAction(player: Player, data: IAction){
        const opponent = player.getOpponent()
        if(opponent){
            this.saveGameStatus(player, data)
            this.send(opponent.Socket,new WebSocketMessage<IAction>(SocketEvent.ACTION,data))
        }
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
                this.send(socket, new WebSocketMessage(SocketEvent.MESSAGE, {
                    message,
                    data
                } ))
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

    send(socket: WebSocket, message: WebSocketMessage){
        const jsonString = JSON.stringify(message.json());
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
                    this.send(player.Socket, new WebSocketMessage(SocketEvent.STOP,
                        {   gameId: game.Id,
                            message: "Seu Oponente se desconectou"
                        }))
                })
                this.logRoom(game.Id,"Game Close - player left")
            }
        }
    }

    private createGame(): Game{
        const [player1, player2] = this.clientQueue.splice(0, 2); // Retira 2 clientes da fila
        const game = new Game(player1, player2);
        const roomId = game.Id
        this.rooms.set(roomId, game);

        this.gamePlayerJoin(game, player1, player2)
        this.gamePlayerJoin(game, player2, player1)
        return game
    }

    private gamePlayerJoin(game: Game, player1: Player, player2: Player){
        player1.SetGame(game)
        this.send(player1.Socket, new WebSocketMessage<IJoin>(SocketEvent.JOIN,{
            clientId: player1.Id,
            OpponentId: player2.Id,
            game: player1.Game?.info,
            isLeft: player1.isLeft
        }))
        this.onMessage(player1.Socket,`<${game.Id}> player join the game`)
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
        this.send(socket, new WebSocketMessage(SocketEvent.CONNECTION, {
            ...response,
        }))
        
        return player
    }

    private registerOnQueue(player: Player){
        if(player)
            this.clientQueue.push(player)
            this.send(player.Socket, new WebSocketMessage(SocketEvent.WAIT, {
                message: "Você está na fila para uma partida."
        }))

        this.checkRoomAvailability()
    }
}