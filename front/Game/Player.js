import { Color } from "../Engine/Colors.js";
import { Rect } from "../Engine/Geometry.js";
import { RigidObject } from "../Engine/Middleware/RigidObject.js";
import { Position } from "../Engine/Position.js";
import { Vector } from "../Engine/Vector.js";
import { GameActions, InputKeys, SocketEvent } from "../Engine/enums/index.js";
import {WebSocketMessage} from '../Engine/Middleware/WebSocketMessage.js'
import {Ball} from './Ball.js'
import {Timer} from '../Engine/Timer.js'
export class Player extends RigidObject{
    _id = ""
    #input
    _magSpeed
    _height
    _webSocket
    _score = 0
    #timer
    #isLeft = false
    constructor(position, height){
        super(position, new Rect(position, 30,120))
        this._applyPhysics = false
        this.bbox.color = Color.BLUE
        this._magSpeed = 3
        this._height = height
        this.#timer = new Timer()
        this.#timer.startTimer();
    }

    get isLeft(){
        return this.#isLeft
    }

    set isLeft(value){
        this.#isLeft = value
    }
    set score(value){
        this._score = value
    }
    get score(){
        return this._score
    }
    set webSocket(ws){
        this._webSocket = ws
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

    get info(){
        return{
            clientId: this.id,
            score: this.score,
            position: this.position
        }
    }

    #validPosition(bbox){
        return bbox.top >= 0 && bbox.bottom <= this._height
    }

    onCollision(obj){
        if(obj instanceof Ball){
            const timer = this.#timer.getElapsedSeconds()
            if(timer > 1){
                console.log(timer)
                this.#timer.resetTimer();
                this._webSocket.send(new WebSocketMessage(SocketEvent.COLLISION,{}))
            }
        }
    }

    update(){
        if(this.#input.keyDown(InputKeys.UP_ARROW)){
            const oldPos = this.position.copy()
            this.speed = Vector.Up.prod(this._magSpeed)
            this.translateTo(this.speed)
            if(!this.#validPosition(this.bbox)){
                this.moveTo(oldPos)
            }
            this._webSocket.send(new WebSocketMessage(SocketEvent.ACTION,{
                actionType: GameActions.IN_UP,
                opponent: this.info
            }))
        }else if(this.#input.keyDown(InputKeys.DOWN_ARROW)){
            const oldPos = this.position.copy()
            this.speed = Vector.Down.prod(this._magSpeed)
            this.translateTo(this.speed)
            if(!this.#validPosition(this.bbox)){
                this.moveTo(oldPos)
            }
            this._webSocket.send(new WebSocketMessage(SocketEvent.ACTION,{
                actionType: GameActions.IN_DOWN,
                opponent: this.info
            }))
        }
    }
}