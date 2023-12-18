import {Circle} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
import { RigidObject } from "../Engine/Middleware/RigidObject.js";
import { Player } from './Player.js';
import { WebSocketMessage } from '../Engine/Middleware/WebSocketMessage.js';
import { SocketEvent } from '../Engine/enums/index.js';

export class Ball extends RigidObject{
    #magSpeed = 2
    #width 
    #height
    #countPlayer = 0
    #countOpponent = 0
    #start = false

    #webSocket

    constructor(position, width, height){
        super(position, new Circle(position, 10, Color.RED))
        this._applyPhysics = false
        this.#height = height
        this.#width = width
    }
    set webSocket(ws){
        this.#webSocket = ws
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
        this.#start = false
    }

    draw(context){
        super.draw(context)
        if(this.#start){
            this.#webSocket.send(new WebSocketMessage(SocketEvent.UPDATE,{x: this.x, y: this.y}))
        }
    }
    update(){
        if(this.#start){
            // this.translateTo(this.speed)
            // if(this.bbox.top <= 0 || this.bbox.bottom >= this.#height){
            //     this.speed.inverteY(0.7 + Math.random() * 0.3)
            // }
    
            // if(this.bbox.left <= 0 ){
            //     this.#countOpponent++
            // }else if(this.bbox.right >= this.#width ){
            //     this.#countPlayer++
            // }
        }
    }

    onCollision(obj){
        if(obj instanceof Player){
            // this.speed.inverteX(0.7 + Math.random() * 0.3)
        }
    }
    
}

