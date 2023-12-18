import { IPosition, IVector } from "@core/DTOs"

export class Ball{
    private position : IPosition = {x:0, y:0}
    private speed : IVector = {x:0, y:0}
    private magSpeed : number = 2
    constructor(){
    }

    get direction():IVector{
        return this.speed
    }

    set direction(speed){
        this.speed = speed
    }

    get Position(){
        return this.position
    }

    setPosition(pos:IPosition){
        this.position.x = pos.x
        this.position.y = pos.y
    }

    get InverseX():IPosition{
        return {x: -this.position.x, y: this.position.y}
    }

    update(){
        if(this.position.y < 0 || this.position.y > 600){
            this.invertY()
        }
    }

    get Delta():IVector{
        return {x: this.speed.x*this.magSpeed, y: this.speed.y*this.magSpeed}
    }

    invertX(){
        this.speed.x *= -1
    }
    invertY(){
        this.speed.y *= -1
    }
}