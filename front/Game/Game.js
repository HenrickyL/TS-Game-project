import { Position } from '../Engine/Position.js'
import {Scene} from '../Engine/Scene.js'
import { Button } from '../Engine/Middleware/Button.js'
import { Color } from '../Engine/Colors.js'
import { CollisionDetection } from '../Engine/Middleware/CollisionDetection.js'
import { Ball } from './Ball.js'
import {Timer} from "../Engine/Timer.js"
import {Text} from "../Engine/Text.js"
import { Player } from './Player.js'
import {Opponent} from './Opponent.js'
import { GameActions, InputKeys, SocketEvent } from '../Engine/enums/index.js'
import { WebSocketMessage } from '../Engine/Middleware/WebSocketMessage.js'
import { Vector } from '../Engine/Vector.js'

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

    #ball
    #player
    #opponent

    #btStart
    #webSocket
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
        if(!this.#start && 
            ((CollisionDetection.isPointInsideRect(this.#input.mouseClick, this.#btStart.background) 
                && this.#input.onClick ) ||
                this.#input.keyPress(InputKeys.SPACE)
        )){
            this.#webSocket.send(new WebSocketMessage(SocketEvent.START,{}))
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
        this.#player = new Player(this.#graphics.middleLeft, this.#graphics.height)
        this.#player.webSocket = this.#webSocket
        this.#player.input = this.#input
        this.#scene.add(this.#player)

    }
    #initOpponent(){
        this.#opponent = new Opponent(this.#graphics.middleRight, this.#graphics.height)
        this.#opponent.webSocket = this.#webSocket
        this.#opponent.input = this.#input
        this.#scene.add(this.#opponent)
        this.#webSocket.addMessageHandler(SocketEvent.ACTION, (actionData)=>{
           const action = actionData.data.actionType
           if(action === GameActions.IN_DOWN){
            this.#opponent.translateByDirection(Vector.Down)
           }else if(action === GameActions.IN_UP){
            this.#opponent.translateByDirection(Vector.Up)
           }
        })
    }

    #initBall(){
        this.#ball = new Ball(this.#graphics.middleCenter, this.#graphics.width, this.#graphics.height)
        this.#scene.add(this.#ball)
    }

    init(graphics, input, webSocket){
        this.#input = input
        this.#graphics = graphics
        this.#webSocket = webSocket
        this.#context = this.#graphics.context
        const ref = this.#graphics.topCenter
        const pos = new Position(ref.x, ref.y+20)
        this.#timerCount = new Text(`${this.#timeToGo.toString().padStart(2,'0')}`,pos, Color.BLACK, 45)
        
        this.#initBall()
        this.#initPlayer()
        this.#initOpponent()
        this.#webSocket.addMessageHandler(SocketEvent.JOIN, (joinData)=>{
            const direction = joinData.data.game.initialDirection
            this.#start = true
            this.#timer.startTimer()
            this.#ball.speed = new Vector(direction.x, direction.y)
        })
        
        this.#createBtStart()
        console.clear()
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
                this.#ball.start()
            }else{
                this.#timerCount.text = `${(this.#timeToGo - Math.floor(this.#timer.getElapsedSeconds())).toString().padStart(3,'0')}`
            }
        }else if(!this.#pause){
            this.#timerCount.text = `${Math.floor(this.#timer.getElapsedSeconds()).toString().padStart(3,'0')}`

        }
    }
}