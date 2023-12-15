import {Movable} from '../Engine/Middleware/Movable.js'
import { Position } from '../Engine/Position.js'


export class Camera extends Movable{
    #width
    #height
    constructor(width, height){
        super(new Position())
        this.#width = width
        this.#height = height
    }

    get height(){
        return this.#height
    }

    get width(){
        return this.#width
    }


}