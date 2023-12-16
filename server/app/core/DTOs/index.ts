import { GameActions, PlayerStatus, SocketEvent } from "@core/enums"
import { GameStatus } from "@core/enums/GameStatus"

export interface IConnectClient {
    clientId: string
    status: PlayerStatus
}

export interface IConnectGame {
    gameId: string
    status: GameStatus
}


export interface IMessage<T = Object>{
    type: string
    message?: string
    data?: T,
    createdAt: Date
}

export interface ICloseGame{
    gameId: string,
    reason: string
}

export interface IJoin{
    clientId: string,
    OpponentId: string,
    game?: IGame
}


export interface IAction{
    actionType: GameActions,
    opponent: IPlayer,
}

export interface IPlayer{
    clientId: string,
    score: number,
    opponentId?: string
    gameId?: string
    position: IPosition
}

export interface IGame{
    id: string,
    initialDirection: IVector
}

export interface IPosition{
    x: number,
    y: number
}

export interface IVector{
    x: number,
    y: number
}

