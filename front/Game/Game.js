import {Rect} from '../Engine/Geometry.js'
import { Position } from '../Engine/Position.js'
import { InputKeys, ObjectGroup } from '../Engine/enums/index.js'
import {RigidObject} from "../Engine/Middleware/RigidObject.js"
import {Scene} from '../Engine/Scene.js'


export class Game{
    #id
    #context
    #input
    #players = []
    #objects = []
    #scene 
    constructor(id){
        this.#id = id
        this.#scene = new Scene()
    }

    addPlayer(player){
        this.#players.push(player)
    }
    //-------------------------------------
    update(){
        this.#scene.update()
        this.#scene.collisionDetection()
    }

    init(context, input){
        this.#context = context
        this.#input = input
        const pos = new Position(300,50)
        const pos2 = new Position(300,400)

        const bbox1 = new Rect(pos, 30,30)
        const bbox2 = new Rect(pos2, 80,20)

        const player = new RigidObject(pos, bbox1)
        const block = new RigidObject(pos2, bbox2, true)


        this.#scene.add(player, ObjectGroup.MOVING)
        this.#scene.add(block, ObjectGroup.STATIC)
    }


    draw(context){
        this.#scene.draw(context)
    }
}