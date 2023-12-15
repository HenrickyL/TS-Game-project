import { Object } from "../Engine/Object.js";
import {Circle} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
import { Vector } from "../Engine/Vector.js";

export class Ball extends Object{
    #magSpeed = 3
    constructor(position){
        super(position, new Circle(position, 10, Color.BLUE))
    }

    start(){
        this.speed = new Vector(randValue(), randValue()).prod(this.#magSpeed)
    }

    update(){
    }

    #randValue() {
        return Math.random() * 2 - 1; // Gera um número entre -1 e 1
      }
}