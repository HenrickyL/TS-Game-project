import { Object } from "../Engine/Object.js";
import { Position } from "../Engine/Position.js";
import { Vector } from "../Engine/Vector.js";


export class Player extends Object{
    #id = ""
    constructor(id){
        this.#id = id
    }

    get Id(){
        return this.#id
    }


    update(){

    }

    draw(context){

    }

    onCollision(obj){

    }
}