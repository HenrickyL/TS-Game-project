import { PlayerStatus } from "@core/enums";

import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws'
import { Game } from "./Game";
import { IPlayer, IPosition } from "@core/DTOs";

export class Player{
    private status: PlayerStatus = PlayerStatus.DISCONNECTED
    private socket: WebSocket
    private readonly id: string
    private game: Game | null  = null
    private score : number = 0
    private position: IPosition = {x: 0, y: 0}

    constructor(socket: WebSocket){
        this.id = uuid()
        this.status = PlayerStatus.DISCONNECTED
        this.socket = socket
    }

    get Id():string{
        return this.id
    }
    get Status():PlayerStatus{
        return this.status
    }
    get Socket():WebSocket{
        return this.socket
    }
    get Game():Game | null{
        return this.game
    }
    get Position(): IPosition {
        return this.position
    }
    get Score(): number{
        return this.score
    }



    get Info(): IPlayer{
        return {
            clientId: this.id,
            gameId: this.game?.Id,
            score: this.score,
            position: this.position,
            opponentId: this.getOpponent()?.Id
        }
    }

    public SetStatus(status: PlayerStatus):void{
        this.status = status
    }

    public SetGame(game: Game): void{
        this.game = game
    }

    public setScore(score:number): void{
        this.score = score
    }

    public getOpponent(): Player | undefined{
        return this.game?.Players.filter(player=> player.Id !== this.Id)[0]
    }
}