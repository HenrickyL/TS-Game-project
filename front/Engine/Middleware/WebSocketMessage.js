export class WebSocketMessage{
    #type
    #data
    #createdAt
    #message
    constructor(type, data, message = null){
        this.#type = type
        this.#data = data
        this.#message = message
        this.#createdAt = new Date()
    }

    get type(){
        return this.#type
    }
    get data(){
        return this.#data
    }
    get createdAt(){
        return this.#createdAt
    }

    json(){
        return {
            type: this.type,
            data: this.data,
            message: this.#message,
            createdAt: this.createdAt
        }
    }
}