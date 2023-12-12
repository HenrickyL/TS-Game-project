export class Object{
    #bbox //Geometry colision
    #position

    constructor(position, bbox){
        this.#bbox = bbox
        this.#position = position
    }

    update(){}
    draw(){}
    onCollision(){}
}