import { Position } from "../Engine/Position";

export class Player{
    #position 
    #id = ""
    constructor(id){
        this.#id = id
        this.#position = new Position(0,0)
    }

    get Id(){
        return this.#id
    }

    get Position(){
        return this.#position
    }



    update(){

    }

    draw(context){

    }
}