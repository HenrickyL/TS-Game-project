import { Color } from "../Engine/Colors.js";
import { Rect } from "../Engine/Geometry.js";
import { RigidObject } from "../Engine/Middleware/RigidObject.js";
import { Position } from "../Engine/Position.js";
import { Vector } from "../Engine/Vector.js";
import { InputKeys } from "../Engine/enums/index.js";


export class Player extends RigidObject{
    _id = ""
    #input
    _magSpeed
    _height
    constructor(position, height){
        super(position, new Rect(position, 30,120))
        this._applyPhysics = false
        this.bbox.color = Color.BLUE
        this._magSpeed = 3
        this._height = height
    }

    set input(inp){
        this.#input = inp
    }

    get id(){
        return this._id
    }
    set id(value){
        this._id = value
    }

    #validPosition(bbox){
        return bbox.top >= 0 && bbox.bottom <= this._height
    }
    update(){
        if(this.#input.keyDown(InputKeys.UP_ARROW)){
            const oldPos = this.position.copy()
            this.speed = Vector.Up.prod(this._magSpeed)
            this.translateTo(this.speed)
            if(!this.#validPosition(this.bbox)){
                this.moveTo(oldPos)
            }
        }else if(this.#input.keyDown(InputKeys.DOWN_ARROW)){
            const oldPos = this.position.copy()
            this.speed = Vector.Down.prod(this._magSpeed)
            this.translateTo(this.speed)
            if(!this.#validPosition(this.bbox)){
                this.moveTo(oldPos)
            }
        }
    }
}