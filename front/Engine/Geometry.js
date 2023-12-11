import {NotImplementError} from '../Errors/index.js'

import {GeometryType} from '../Engine/enums/index.js'

import {Colors} from './Colors.js'

export class Geometry{
    _position
    _type
    _color
    _rotateRad = 0

    constructor(position, type){
        this._position = position
        this._type = type
        this._color = Colors.BLUE
    }

    get X(){
        return this.Position.X
    }
    get Y(){
        return this.Position.Y
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

    get RotateAngle(){
        return this._rotateRad * 180/Math.PI
    }

    set RotateAngle(angle){
        this._rotateRad = angle*Math.PI/180
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

    get left(){
        throw new NotImplementError();
    }
    get right(){
        throw new NotImplementError();
    }

    get top(){
        throw new NotImplementError();
    }
    get down(){
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
        context.save();

        context.translate(this.X, this.Y);
        context.rotate(this._rotateRad);

        context.fillStyle = this.Color
        context.fillRect(-this.Width/2, -this.Height/2, this.Width,this.Height)

        context.restore();
    }

    get left(){
        return this.Position.X - this.Width/2
    }
    get right(){
        return this.Position.X + this.Width/2
    }

    get top(){
        return this.Position.Y - this.Height/2
    }
    get down(){
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

    get left(){
        return this.Position.X - this.Radius
    }
    get right(){
        return this.Position.X + this.Radius
    }

    get top(){
        return this.Position.Y - this.Radius
    }
    get down(){
        return this.Position.Y + this.Radius
    }
}