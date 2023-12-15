import {Movable} from "./Middleware/Movable.js"


export class Object extends Movable{
    _bbox //Geometry colision
    _isColliding = false
    constructor(position, bbox){
        super(position)
        this._bbox = bbox
        this._bbox.position = this._position
    }

    get bbox(){
        return this._bbox
    }

    update(){
        this._isColliding = false
    }
    draw(context){
        this.bbox.draw(context)
    }
    onCollision(obj){
        this._isColliding = true
    }

    onCollisionEnd(obj){}

    moveTo(position){
        super.moveTo(position)
        this.bbox.moveTo(position)
    }
    translateTo(delta){
        super.translateTo(delta)
        this.bbox.translateTo(delta)
    }
}