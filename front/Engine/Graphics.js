import { Position } from "./Position.js"

export class Graphics{
    #canvas
    #context
    #width
    #height

    #topLeft
    #topCenter
    #topRight
    #middleLeft
    #middleCenter
    #middleRight
    #bottomLeft
    #bottomCenter
    #bottomRight

    constructor(width = 800, height=600){
        this.#height = height
        this.#width = width
        this.#canvas = document.querySelector('canvas')
        this.#resize()
        this.#context = this.#canvas.getContext('2d')
        this.#calculateCornersAndCenters();
    }

    get canvas(){
        return this.#canvas
    }
    get context(){
        return this.#context
    }

    get width(){
        return this.#width
    }

    get height(){
        return this.#height
    }

    clear(){
        this.#context.clearRect(0,0, this.#width, this.#height)
    }
    #resize(){
        this.#canvas.width = this.#width
        this.#canvas.height = this.#height
    }


    #calculateCornersAndCenters() {
        this.#topLeft = new Position(0, 0);
        this.#topCenter = new Position(this.#width / 2, 0);
        this.#topRight = new Position(this.#width, 0);
        this.#middleLeft = new Position(0, this.#height / 2);
        this.#middleCenter = new Position(this.#width / 2, this.#height / 2);
        this.#middleRight = new Position(this.#width, this.#height / 2);
        this.#bottomLeft = new Position(0, this.#height);
        this.#bottomCenter = new Position(this.#width / 2, this.#height);
        this.#bottomRight = new Position(this.#width, this.#height);
    }

    // Métodos getter para os cantos e centros
    get topLeft() {
        return this.#topLeft;
    }

    get topCenter() {
        return this.#topCenter;
    }

    get topRight() {
        return this.#topRight;
    }

    get middleLeft() {
        return this.#middleLeft;
    }

    get middleCenter() {
        return this.#middleCenter;
    }

    get middleRight() {
        return this.#middleRight;
    }

    get bottomLeft() {
        return this.#bottomLeft;
    }

    get bottomCenter() {
        return this.#bottomCenter;
    }

    get bottomRight() {
        return this.#bottomRight;
    }
}