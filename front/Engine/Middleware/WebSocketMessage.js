export class WebSocketMessage{
    #type
    #data
    #createdAt
    constructor(type, data){
        this.#type = type
        this.#data = data
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
            data: {...this.data, createdAt: this.createdAt },
        }
    }
}