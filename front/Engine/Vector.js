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

    


}