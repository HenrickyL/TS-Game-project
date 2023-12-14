import { Position } from "../Position.js";

export class Movable {
    _rotateRad = 0
    _position;
    constructor(position = new Position()) {
        this._position = new Position(position.x, position.y)
    }

    get x(){
        return this._position.x
    }

    get y(){
        return this._position.y
    }

    set position(pos){
        this._position = pos
    }

    get position() {
        return this._position;
    }

    get rotateAngle(){
        return this._rotateRad * 180/Math.PI
    }

    set rotateAngle(angle){
        this._rotateRad = angle*Math.PI/180
    }

    moveTo(position){
        this._position.x = position.x
        this._position.y = position.y
    }

    moveTo(x, y){
        this._position.x = x
        this._position.y = y
    }

    translateTo(dx, dy=0){
        this._position.x += dx
        this._position.y += dy
    }
}