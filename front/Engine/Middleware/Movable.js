import { InvalidArgumentError } from "../../Errors/index.js";
import { Position } from "../Position.js";
import {Vector} from '../Vector.js'

export class Movable {
    _rotateRad = 0
    _position;
    _initialPosition
    _speed = Vector.Zero;
    _momentum = Vector.Zero
    constructor(position = new Position(), speed = Vector.Zero) {
        this._position = new Position(position.x, position.y)
        this._initialPosition = new Position(position.x, position.y)
        this._speed = speed
    }

    get initialPosition(){
        return this._initialPosition
    }
    get speed(){
        return this._speed
    }
    set speed(vec){
        this._speed = vec
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

    translateTo(delta){
        if(delta instanceof Vector){
            this._position.x += delta.x
            this._position.y += delta.y
        }else{
            throw new InvalidArgumentError("Expected a Vector.")
        }
    }

    
}