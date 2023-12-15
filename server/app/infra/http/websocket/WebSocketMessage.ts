import { SocketEvent } from "@core/enums"

export class WebSocketMessage<T = Object>{
    private _type : SocketEvent
    private _data : T
    private _createdAt: Date
    constructor(type: SocketEvent, data: T){
        this._type = type
        this._data = data
        this._createdAt = new Date()
    }

    get type(){
        return this._type
    }
    get data(){
        return this._data
    }
    get createdAt(){
        return this._createdAt
    }

    json(){
        return {
            type: this.type,
            data: {...this.data, createdAt: this.createdAt },
        }
    }
}