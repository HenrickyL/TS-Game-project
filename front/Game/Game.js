import {Point} from '../Engine/Geometry.js'
import { Position } from '../Engine/Position.js'
import { InputKeys } from '../Engine/enums/index.js'

export class Game{
    #id
    #context
    #input
    #players = []
    #objects = []
    constructor(id){
        this.#id = id
    }

    addPlayer(player){
        this.#players.push(player)
    }
    //-------------------------------------
    update(){
        if(this.#input.keyDown(InputKeys.RIGHT_ARROW)){
            this.#objects.forEach(obj =>{
                obj.translateTo(5,5)
            })
        }
    }

    init(context, input){
        this.#context = context
        this.#input = input
        const pos = new Position(50,50)
        const point = new Point(pos)
        this.#objects.push(point)
    }


    draw(){
        this.#objects.forEach(obj =>{
            obj.draw(this.#context)
        })
    }
}