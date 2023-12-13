import { Position } from "./Position.js"

export class Graphics{
    #canvas
    #context
    #width
    #height
    #center

    constructor(width = 800, height=600){
        this.#height = height
        this.#width = width
        this.#canvas = document.querySelector('canvas')
        this.#resize()
        this.#context = this.#canvas.getContext('2d')
        this.#center = new Position(this.#width/2, this.#height/2)
    }

    get Center(){
        return this.#center
    }
    get canvas(){
        return this.#canvas
    }
    get context(){
        return this.#context
    }

    clear(){
        this.#context.clearRect(0,0, this.#width, this.#height)
    }
    #resize(){
        this.#canvas.width = this.#width
        this.#canvas.height = this.#height
    }
}