import { PlayerStatus } from "@core/enums";

import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws'
import { Game } from "./Game";

export class Player{
    private status: PlayerStatus = PlayerStatus.DISCONNECTED
    private socket: WebSocket
    private readonly id: string
    private game: Game | null  = null

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

    public SetStatus(status: PlayerStatus):void{
        this.status = status
    }

    public SetGame(game: Game): void{
        this.game = game
    }
}