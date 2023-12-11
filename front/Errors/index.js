export class ThrowError extends Error{
    #name 
    #mensagem
    constructor(message){
        super(mensagem);
        this.name = this.constructor.name;
        this.mensagem = mensagem;
    }
}


export class NotImplementError extends ThrowError{
    constructor(){
        super("Method not implement")
    }
}
