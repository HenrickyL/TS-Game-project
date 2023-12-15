export class ThrowError extends Error{
    #name 
    #message
    constructor(message){
        super(message);
        this.#name = this.constructor.name;
        this.#message = message;
    }
}


export class NotImplementError extends ThrowError{
    constructor(){
        super("Method not implement")
    }
}


export class GameNotDefinedInEngineError  extends ThrowError{
    constructor(){
        super("No game provided. Please provide a valid game object to Engine.")
    }
}

export class InputCanvasNotDefinedError  extends ThrowError{
    constructor(){
        super("No canvas input provided. Please provide a valid canvas object Input with 'setCanvas'.")
    }
}


export class InvalidArgumentError  extends ThrowError{
    constructor(message = ""){
        super(`Invalid Argument. ${message}`)
    }
}
