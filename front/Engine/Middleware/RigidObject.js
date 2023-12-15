import {Object} from "../Object.js"
import { Vector } from "../Vector.js"
import { RigidObjectType } from "../enums/index.js"


export class RigidObject extends Object{
    static #gravity = Vector.Down.prod(0.1)
    _normal = Vector.Zero
    _applyPhysics = true
    _currentStatic = false
    #zero = Vector.Zero
    _type = RigidObjectType.DEFAULT

    constructor(position, bbox, applyPhysics = false){
        super(position, bbox)
        this._applyPhysics = applyPhysics
    }


    static get gravity(){
        return RigidObject.#gravity
    }

    get normal(){
        return this._normal
    }

    update(){
        super.update()
        let resultActions = this.#zero
        if(this._applyPhysics && !this._currentStatic){
            resultActions = resultActions.add(RigidObject.gravity.add(this._normal))
            this._momentum.increase(this._speed.add(resultActions))
            this.translateTo(this._momentum)
        }
        this._normal = this.#zero
        this._currentStatic = false
    }

    onCollision(obj){
        super.onCollision(obj)
        if(obj instanceof RigidObject){
            if(this._applyPhysics && RigidObjectType.DEFAULT == this._type){
                //parar
                obj._currentStatic = true;
                //quicar
                // obj._normal = obj._momentum.inverse.prod(1.9)
                //quicar continuo
                // obj._normal = obj._momentum.inverse
                // obj._momentum = new Vector(0,-0.01)

                //quixar uma vez
                // obj._normal = obj._momentum.inverse.add(obj.speed)
                // obj._momentum = this.#zero
                //atravessar
                // obj._normal = obj.speed.inverse
            }
        }
    }

    //TODO:
    onCollisionEnd(obj){

    }
}