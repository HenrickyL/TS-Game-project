import { InvalidArgumentError } from "../Errors/index.js"

export class Vector{
    #x
    #y
    constructor(x=0,y=0){
        this.#x = x
        this.#y = y
    }

    get x(){
        return this.#x
    }

    get y(){
        return this.#y
    }

    get magnitude(){
        return Math.sqrt(this.x^2 + this.y^2)
    }

    get unitary(){
        const mag = this.magnitude
        return new Vector(this.x/mag, this.y/this.magnitude)
    }
    get inverse(){
        return new Vector(-this.x, -this.y)
    }


    add(other){
        if(other instanceof Vector){
            return new Vector(this.x + other.x, this.y + other.y)
        }else{
            throw new InvalidArgumentError("Expected a vector.")
        }
    }

    sub(other){
        if(other instanceof Vector){
            return new Vector(this.x - other.x, this.y - other.y)
        }else{
            throw new InvalidArgumentError("Expected a vector.")
        }
    }

    prod(num){
        return new Vector(this.x*num, this.y*num)
    }

    eq(other){
        if(other instanceof Vector){
            return this.x == other.x && this.y == other.y
        }else{
            throw new InvalidArgumentError("Expected a vector.")
        }
    }

    isColinear(other){
        return  this.x * other.y === this.y * other.x;
    }

    increase(other){
        if(other instanceof Vector){
            this.#x += other.x
            this.#y += other.y
        }else{
            console.error('>>',other)
            throw new InvalidArgumentError("Expected a vector.")
        }
    }

    inverteX(proportion = 1){
        this.#x *=-proportion
    }

    inverteY(proportion = 1){
        this.#y *=-proportion
    }

    static get Right(){
        return new Vector(1,0)
    }
    static get Left(){
        return new Vector(-1,0)
    }
    static get Down(){
        return new Vector(0,1)
    }
    static get Up(){
        return new Vector(0,-1)
    }
    static get One(){
        return new Vector(1,-1)
    }
    static get Zero(){
        return new Vector(0,0)
    }

}