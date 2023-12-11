import {NotImplementError} from '../Errors/index.js'

import {GeometryType} from '../Engine/enums/index.js'

import {Colors} from './Colors.js'

export class Geometry{
    _position
    _type
    _color

    constructor(position, type){
        this._position = position
        this._type = type
        this._color = Colors.BLUE
    }

    get Color(){
        return this._color
    }
    get Type(){
        return this._type
    }
    get Position(){
        return this._position
    }

    set Position(position){
        this._position = position
    }
    set Color(color){
        this._color = color
    }

    draw(context){
        throw new NotImplementError();
    }

}



export class Rect extends Geometry{
    #width;
    #height;
    
    constructor(position, width, height) {
        super(position, GeometryType.RECTANGLE)
        this.#width = width
        this.#height = height
    }

    set Height(height){
        this.#height = height
    }

    set Width(width){
        this.#width = width
    }
    get Height() {
        return this.#height;
    }
    get Width() {
        return this.#width;
    }


    draw(context){
        context.fillStyle = this.Color
        context.fillRect(this._position.X,this._position.Y, this.Width,this.Height)
    }
}