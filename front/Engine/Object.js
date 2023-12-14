import {Movable} from "./Middleware/Movable"


export class Object extends Movable{
    #bbox //Geometry colision

    constructor(position, bbox){
        super(position)
        this.#bbox = bbox
        this.#bbox.position = this._position
    }

    get bbox(){
        return this.#bbox
    }

    update(){}
    draw(context){
        this.bbox.draw(context)
    }
    onCollision(obj){
        console.log("colidi com ", obj)
    }
}