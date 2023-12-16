import {Circle} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
import { Vector } from "../Engine/Vector.js";
import { RigidObject } from "../Engine/Middleware/RigidObject.js";
import { Player } from './Player.js';
import { InvalidArgumentError } from '../Errors/index.js';

export class Ball extends RigidObject{
    #magSpeed = 2.5
    #width 
    #height
    #countPlayer = 0
    #countOpponent = 0
    #start = false

    constructor(position, width, height){
        super(position, new Circle(position, 10, Color.RED))
        this._applyPhysics = false
        this.#height = height
        this.#width = width
    }

    get countPlayer(){
        return this.#countPlayer
    }

    get countOpponent(){
        return this.#countOpponent
    }

    start(){
        this.speed = this.speed.prod(this.#magSpeed)
    }

    reset(){
        this.position.moveTo(this.initialPosition)
        this.start()
    }

    update(){
        this.translateTo(this.speed)
        if(this.bbox.top <= 0 || this.bbox.bottom >= this.#height){
            this.speed.inverteY(0.7 + Math.random() * 0.3)
        }

        if(this.bbox.left <= 0 ){
            this.#countOpponent++
        }else if(this.bbox.right >= this.#width ){
            this.#countPlayer++
        }
    }

    onCollision(obj){
        if(obj instanceof Player){
            this.speed.inverteX(0.7 + Math.random() * 0.3)
        }
    }
    
}

