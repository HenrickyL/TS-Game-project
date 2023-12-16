import { Color } from "../Engine/Colors.js"
import {Player} from "./Player.js"

export class Opponent extends Player{
    constructor(position, height){
        super(position, height)
        this.bbox.color = Color.BLACK
    }

    update(){}

    translateByDirection(direction){
        this.speed = direction.prod(this._magSpeed)
        this.translateTo(this.speed)
    }

}