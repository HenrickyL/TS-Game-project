import {Circle} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
import { RigidObject } from "../Engine/Middleware/RigidObject.js";
import { Player } from './Player.js';

export class Ball extends RigidObject{
    #magSpeed = 2
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
        this.#start= true
        this.speed = this.speed.prod(this.#magSpeed)
    }

    reset(){
        this.position.moveTo(this.initialPosition)
        this.start()
    }

    update(){
        if(this.#start){
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
    }

    onCollision(obj){
        if(obj instanceof Player){
            this.speed.inverteX(0.7 + Math.random() * 0.3)
        }
    }
    
}

