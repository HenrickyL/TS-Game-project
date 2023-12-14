import { PlayerStatus } from "@core/enums"
import { GameStatus } from "@core/enums/GameStatus"

export interface IConnectClient {
    clientId: string
    status: PlayerStatus
}

export interface IConnectGame {
    gameId: string
    status: GameStatus
}


export interface IMessage<T = any>{
    type: string
    message: string
    data?: T
}

export interface ICloseGame{
    gameId: string,
    reason: string
}