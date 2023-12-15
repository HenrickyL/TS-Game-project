import { Object } from "../Engine/Object.js";
import {Circle} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
import { Vector } from "../Engine/Vector.js";

export class Ball extends Object{
    #magSpeed = 5
    constructor(position){
        super(position, new Circle(position, 10, Color.BLUE))
    }

    start(){
        this.speed = new Vector(getDirection(), getDirection()).prod(this.#magSpeed)
    }

    update(){
        this.translateTo(this.speed)
    }
    
}

function getDirection() {
    return Math.floor(Math.random()*100) % 5 == 0 ? 1 : -1; 
}