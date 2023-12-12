import {NotImplementError} from '../Errors/index.js'

import {GeometryType} from '../Engine/enums/index.js'

import {Color} from './Colors.js'
import {Position} from './Position.js'


export class Geometry{
    _position
    _type
    _color
    _rotateRad = 0

    constructor(position, type){
        this._position = new Position(position.X, position.Y)
        this._type = type
        this._color = Color.BLUE
    }

    get X(){
        return this.Position.X
    }
    get Y(){
        return this.Position.Y
    }

    get color(){
        return this._color
    }
    get Type(){
        return this._type
    }
    get Position(){
        return this._position
    }
    get alpha(){
        return this.Color.alpha
    }

    set alpha(a){
        this._color.alpha = a
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
    set color(color){
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


    moveTo(position){
        this._position.X = position.X
        this._position.Y = position.Y
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

        context.fillStyle = this.color.RGBA
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
    #isFill
    #borderColor
    
    constructor(position, radius, isFill = true) {
        super(position, GeometryType.CIRCLE)
        this.#radius = radius
        this.#isFill = isFill
        this.#borderColor = Color.BLACK
    }

    set Radius(radius){
        this.#radius = radius
    }
    
    get Radius() {
        return this.#radius;
    }

    get borderColor(){
        return this.#borderColor
    }

    set borderColor(color){
        this.#borderColor = color
    }

    get isFill(){
        return this.#isFill
    }

    set isFill(fill){
        this.#isFill = fill
    }

    draw(context){
        context.beginPath()
        context.arc(this.Position.X,this.Position.Y, this.#radius, 0 , Math.PI*2,  false)
        context.strokeStyle = this.borderColor.RGBA
        context.stroke()
        context.fillStyle = this.color.RGBA
        if(this.#isFill)
            context.fill()
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



export class Line extends Geometry{
    #initialPosition
    #finalPosition
    
    constructor(start, end) {
        super(Position.centerTo(start, end), GeometryType.LINE)
        this.#initialPosition = start
        this.#finalPosition = end

    }

    set start(position){
        this.#initialPosition = position
    }

    set end(position){
        this.#finalPosition = position
    }

    
    get start() {
        return this.#initialPosition;
    }

    get end() {
        return this.#finalPosition;
    }

    draw(context){

        context.beginPath()
        context.moveTo(this.start.X,this.start.Y)
        context.lineTo(this.end.X,this.end.Y)

        context.strokeStyle = this.color.RGBA
        context.stroke()
    }

    set RotateAngle(angle){
        this._rotateRad = -angle*Math.PI/180
        this.#rotate(this._rotateRad);
        this.#initialPosition = Position.rotatePoint(this.#initialPosition, this.Position, this._rotateRad)
        this.#finalPosition = Position.rotatePoint(this.#finalPosition, this.Position, this._rotateRad)
    }

    #rotate(angle) {
        const center = Position.centerTo(this.#initialPosition, this.#finalPosition);
    
        const rotatedStart = Position.rotatePoint(this.#initialPosition, center, angle);
        const rotatedEnd = Position.rotatePoint(this.#finalPosition, center, angle);
    
        this.#initialPosition = rotatedStart;
        this.#finalPosition = rotatedEnd;
    }

    moveTo(position){
        const dx = position.X - this.Position.X;
        const dy = position.Y - this.Position.Y;

        this.#initialPosition.X += dx;
        this.#initialPosition.Y += dy;

        this.#finalPosition.X += dx;
        this.#finalPosition.Y += dy;

        const newCenter = new Position((this.#initialPosition.X + this.#finalPosition.X) / 2, (this.#initialPosition.Y + this.#finalPosition.Y) / 2);

        this.Position = newCenter;
    }

    get left(){
        return this.#initialPosition.X < this.#finalPosition.X ? this.#initialPosition.X :this.#finalPosition.X
    }
    get right(){
        return this.#initialPosition.X > this.#finalPosition.X ? this.#initialPosition.X :this.#finalPosition.X
    }

    get top(){
        return this.#initialPosition.Y < this.#finalPosition.Y ? this.#initialPosition.Y :this.#finalPosition.Y
    }
    get down(){
        return this.#initialPosition.Y > this.#finalPosition.Y ? this.#initialPosition.Y :this.#finalPosition.Y
    }
}


export class Point extends Geometry {
    #size = 5;
    #isSquare = true;

    constructor(position, isSquare = true) {
        super(position, GeometryType.POINT);
        this.#isSquare = isSquare;
    }

    set Size(size) {
        this.#size = size;
    }

    set IsSquare(isSquare) {
        this.#isSquare = isSquare;
    }

    get Size() {
        return this.#size;
    }

    get IsSquare() {
        return this.#isSquare;
    }

    draw(context) {
        context.save();
        context.translate(this.X, this.Y);
        context.fillStyle = this.color.RGBA;

        if (this.#isSquare) {
            context.fillRect(-this.#size/2, -this.#size/2, this.#size, this.#size);
        } else {
            context.beginPath();
            context.arc(0, 0, this.#size/2, 0, Math.PI * 2);
            context.fill();
            context.closePath();

        }
        context.restore()
    }
}



export class Polygon extends Geometry{
    #points = []
    #borderColor

    constructor(position, points = [], borderColor = Color.BLACK) {
        super(position, GeometryType.POINT);
        this.#points = points;
        this.#borderColor = borderColor
    }

    addPoint(position){
        if(!this.#points.some(pos => pos.X === position.X && pos.Y === position.Y))
            this.#points.push(position)
    }

    draw(context) {
        if(this.#points.length<3)return

        context.beginPath();
        this.#points.forEach((point, i)=>{
            if(i == 0){
                context.moveTo(point.X,point.Y)
            }else{
                context.lineTo(point.X,point.Y)
            }
        })
        context.lineTo(this.#points[0].X,this.#points[0].Y)
        context.strokeStyle = this.#borderColor.RGBA;
        context.stroke()
        context.fillStyle = this.color.RGBA;
        context.fill()
        context.closePath();
    }

    
}