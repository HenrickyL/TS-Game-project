import { PlayerStatus } from "@core/enums"

export interface IConnectClient {
    clientId: string
    status: PlayerStatus
}


export interface IMessage<T = any>{
    type: string
    message: string
    data?: T
}

export interface CloseGame{
    gameId: string,
    reason: string
}