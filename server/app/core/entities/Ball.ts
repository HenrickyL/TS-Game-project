import { IPosition, IVector } from "@core/DTOs"

export class Ball{
    private position : IPosition
    private speed : IVector
    private magSpeed : number = 3
    constructor(position: IPosition, speed: IVector){
        this.position = position
        this.speed = speed
    }

    get direction():IVector{
        return this.speed
    }
    
    get Position(){
        return this.position
    }
    get InverseX():IPosition{
        return {x: -this.position.x, y: this.position.y}
    }
}