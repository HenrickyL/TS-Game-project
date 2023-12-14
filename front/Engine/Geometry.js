import {NotImplementError} from '../Errors/index.js'

import {GeometryType} from '../Engine/enums/index.js'

import {Color} from './Colors.js'
import {Position} from './Position.js'

export class Geometry{
    _position
    _type
    _color = Color.BLUE
    _rotateRad = 0

    constructor(position, type, color = Color.BLUE){
        this._position = new Position(position.x, position.x)
        this._type = type
        this._color = color
    }

    get x(){
        return this.position.x
    }
    get y(){
        return this.position.y
    }

    set position(pos){
        this._position = pos
    }

    get color(){
        return this._color
    }
    get type(){
        return this._type
    }
    get position(){
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
    get bottom(){
        throw new NotImplementError();
    }


    moveTo(position){
        this._position.x = position.x
        this._position.y = position.y
    }

    moveTo(x, y){
        this._position.x = x
        this._position.y = y
    }

    translateTo(dx, dy){
        this._position.x += dx
        this._position.y += dy
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

        context.translate(this.x, this.y);
        context.rotate(this._rotateRad);

        context.fillStyle = this.color.RGBA
        context.fillRect(-this.Width/2, -this.Height/2, this.Width,this.Height)

        context.restore();
    }

    get left(){
        return this.position.x - this.Width/2
    }
    get right(){
        return this.position.x + this.Width/2
    }

    get top(){
        return this.position.y - this.Height/2
    }
    get bottom(){
        return this.position.y + this.Height/2
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

    set radius(r){
        this.#radius = r
    }
    
    get radius() {
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
        context.arc(this.position.x,this.position.y, this.#radius, 0 , Math.PI*2,  false)
        context.strokeStyle = this.borderColor.RGBA
        context.stroke()
        context.fillStyle = this.color.RGBA
        if(this.#isFill)
            context.fill()
    }

    get left(){
        return this.position.x - this.radius
    }
    get right(){
        return this.position.x + this.radius
    }

    get top(){
        return this.position.y - this.radius
    }
    get bottom(){
        return this.position.y + this.radius
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
        context.moveTo(this.start.x,this.start.y)
        context.lineTo(this.end.x,this.end.y)

        context.strokeStyle = this.color.RGBA
        context.stroke()
    }

    set RotateAngle(angle){
        this._rotateRad = -angle*Math.PI/180
        this.#rotate(this._rotateRad);
        this.#initialPosition = Position.rotatePoint(this.#initialPosition, this.position, this._rotateRad)
        this.#finalPosition = Position.rotatePoint(this.#finalPosition, this.position, this._rotateRad)
    }

    #rotate(angle) {
        const center = Position.centerTo(this.#initialPosition, this.#finalPosition);
    
        const rotatedStart = Position.rotatePoint(this.#initialPosition, center, angle);
        const rotatedEnd = Position.rotatePoint(this.#finalPosition, center, angle);
    
        this.#initialPosition = rotatedStart;
        this.#finalPosition = rotatedEnd;
    }

    moveTo(position){
        const dx = position.x - this.position.x;
        const dy = position.y - this.position.y;

        this.#initialPosition.x += dx;
        this.#initialPosition.y += dy;

        this.#finalPosition.x += dx;
        this.#finalPosition.y += dy;

        const newCenter = new Position((this.#initialPosition.x + this.#finalPosition.x) / 2, (this.#initialPosition.y + this.#finalPosition.y) / 2);

        this.position = newCenter;
    }

    get left(){
        return this.#initialPosition.x < this.#finalPosition.x ? this.#initialPosition.x :this.#finalPosition.x
    }
    get right(){
        return this.#initialPosition.x > this.#finalPosition.x ? this.#initialPosition.x :this.#finalPosition.x
    }

    get top(){
        return this.#initialPosition.y < this.#finalPosition.y ? this.#initialPosition.y :this.#finalPosition.y
    }
    get bottom(){
        return this.#initialPosition.y > this.#finalPosition.y ? this.#initialPosition.y :this.#finalPosition.y
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
        context.translate(this.x, this.y);
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
        super(position, GeometryType.POLYGON);
        this.#points = points;
        this.#borderColor = borderColor
    }

    addPoint(position){
        if(!this.#points.some(pos => pos.x === position.x && pos.y === position.y))
            this.#points.push(position)
    }

    draw(context) {
        if(this.#points.length<3)return

        context.beginPath();
        this.#points.forEach((point, i)=>{
            if(i == 0){
                context.moveTo(point.x,point.y)
            }else{
                context.lineTo(point.x,point.y)
            }
        })
        context.lineTo(this.#points[0].x,this.#points[0].y)
        context.strokeStyle = this.#borderColor.RGBA;
        context.stroke()
        context.fillStyle = this.color.RGBA;
        context.fill()
        context.closePath();
    }

    
}