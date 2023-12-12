export class Object{
    #bbox //Geometry colision
    #position

    constructor(position, bbox){
        this.#position = position
        this.#bbox = bbox
        this.#bbox.moveTo(this.#position)
    }
    get bbox(){
        return this.#bbox
    }

    get position(){
        return this.#position
    }

    update(){}
    draw(context){
        this.bbox.draw(context)
    }
    onCollision(obj){
        console.log("colidi com ", obj)
    }
}