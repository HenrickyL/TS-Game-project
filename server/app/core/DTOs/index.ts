export interface IConnectClient {
    clientId: string
}


export interface IMessage<T = any>{
    type: string
    message: string
    data?: T
}