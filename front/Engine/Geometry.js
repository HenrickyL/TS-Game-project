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

    left(){
        throw new NotImplementError();
    }
    right(){
        throw new NotImplementError();
    }

    top(){
        throw new NotImplementError();
    }
    down(){
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
        context.fillRect(this.left(),this.top(), this.Width,this.Height)
    }

    left(){
        return this.Position.X - this.Width/2
    }
    right(){
        return this.Position.X + this.Width/2
    }

    top(){
        return this.Position.Y - this.Height/2
    }
    down(){
        return this.Position.Y + this.Height/2
    }
}


export class Circle extends Geometry{
    #radius = 10;
    
    constructor(position, radius) {
        super(position, GeometryType.CIRCLE)
        this.#radius = radius
    }

    set Radius(radius){
        this.#radius = radius
    }

    
    get Radius() {
        return this.#radius;
    }

    draw(context){
        context.beginPath()
        context.arc(this.Position.X,this.Position.Y, this.#radius, 0 , Math.PI*2,  false)
        context.strokeStyle = this.Color
        context.stroke()
    }

    left(){
        return this.Position.X - this.Radius
    }
    right(){
        return this.Position.X + this.Radius
    }

    top(){
        return this.Position.Y - this.Radius
    }
    down(){
        return this.Position.Y + this.Radius
    }
}