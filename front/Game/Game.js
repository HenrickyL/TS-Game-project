import {Rect} from '../Engine/Geometry.js'
import { Position } from '../Engine/Position.js'
import { InputKeys, ObjectGroup } from '../Engine/enums/index.js'
import {RigidObject} from "../Engine/Middleware/RigidObject.js"
import {Scene} from '../Engine/Scene.js'
import { Button } from '../Engine/Middleware/Button.js'
import { Color } from '../Engine/Colors.js'
import { CollisionDetection } from '../Engine/Middleware/CollisionDetection.js'
import { Ball } from './Ball.js'
import {Timer} from "../Engine/Timer.js"
import {Text} from "../Engine/Text.js"
export class Game{
    #id
    #context
    #input
    #players = []
    #objects = []
    #scene
    #start = false
    #pause = true
    #graphics
    #timer = new Timer()
    #timeToGo = 5

    #infos = []
    #timerCount
    #stringAux = ""

    #btStart
    constructor(id){
        this.#id = id
        this.#scene = new Scene()
    }

    
    #createBtStart(){
        this.#btStart = new Button("START", 25, this.#graphics.middleCenter, Color.WHITE)
    }
    #drawMenu(){
        this.#btStart.draw(this.#context)
    }
    #checkInputs(){
        if(!this.#start && this.#input.onClick && CollisionDetection.isPointInsideRect(this.#input.mouseClick, this.#btStart.background)){
            this.#start = true
            this.#timer.startTimer()
        }
    }

    addPlayer(player){
        this.#players.push(player)
    }
    //-------------------------------------
    update(){
        this.#checkInputs()
        this.#updateTimer()
        this.#scene.update()
        this.#scene.collisionDetection()

    }

    #initPlayer(){

    }
    #initOpponent(){

    }

    #initBall(){
        this.#scene.add(new Ball(this.#graphics.middleCenter))
    }

    init(graphics, input){
        this.#input = input
        this.#graphics = graphics
        this.#context = this.#graphics.context
        const ref = this.#graphics.topCenter
        const pos = new Position(ref.x, ref.y+20)
        this.#timerCount = new Text(`${this.#timeToGo.toString().padStart(2,'0')}`,pos, Color.BLACK, 45)
        
        this.#initBall()
        this.#initPlayer()
        this.#initOpponent()
        
        this.#createBtStart()
    }


    draw(){
        if(!this.#start){
            this.#drawMenu()
        }else{
            this.#scene.draw(this.#context)
            this.#infos.forEach(info =>{
                info.draw(this.#context)
            })
            this.#timerCount.draw(this.#context)
        }
    }

    #updateTimer(){
        if(this.#start && this.#pause){
            if(this.#timer.getElapsedSeconds() > this.#timeToGo){
                this.#pause = false
                this.#timer.resetTimer()
                this.#timerCount.size = 30
            }else{
                this.#timerCount.text = `${(this.#timeToGo - Math.floor(this.#timer.getElapsedSeconds())).toString().padStart(3,'0')}`
            }
        }else if(!this.#pause){
            this.#timerCount.text = `${Math.floor(this.#timer.getElapsedSeconds()).toString().padStart(3,'0')}`

        }
    }
}