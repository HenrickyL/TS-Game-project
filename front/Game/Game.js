import {Rect} from '../Engine/Geometry.js'
import { Position } from '../Engine/Position.js'
import { InputKeys, ObjectGroup } from '../Engine/enums/index.js'
import {RigidObject} from "../Engine/Middleware/RigidObject.js"
import {Scene} from '../Engine/Scene.js'
import { Button } from '../Engine/Middleware/Button.js'
import { Color } from '../Engine/Colors.js'
import { CollisionDetection } from '../Engine/Middleware/CollisionDetection.js'


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
            console.log("click")
        }
    }

    addPlayer(player){
        this.#players.push(player)
    }
    //-------------------------------------
    update(){
        this.#checkInputs()
        this.#scene.update()
        this.#scene.collisionDetection()
    }

    init(graphics, input){
        this.#input = input
        this.#graphics = graphics
        this.#context = this.#graphics.context
        const pos = new Position(300,50)
        const pos2 = new Position(300,400)
        
        const bbox1 = new Rect(pos, 30,30)
        const bbox2 = new Rect(pos2, 80,20)
        
        const player = new RigidObject(pos, bbox1)
        const block = new RigidObject(pos2, bbox2, true)
        
        
        this.#scene.add(player, ObjectGroup.MOVING)
        this.#scene.add(block, ObjectGroup.STATIC)
        this.#createBtStart()
    }


    draw(){
        if(!this.#start){
            this.#drawMenu()
        }else{
            this.#scene.draw(this.#context)
        }
    }
}