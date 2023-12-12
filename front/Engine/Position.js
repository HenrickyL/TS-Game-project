export class Position{
    #x = 0
    #y = 0

    constructor(_x=0, _y=0){
        this.#x = _x
        this.#y = _y
    }

    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }

    set x(xx){
        this.#x = xx
    }

    set y(yy){
        this.#y = yy
    }

    static centerTo(p1, p2){
        const dx = (p2.X - p1.X)
        const dy = (p2.Y - p1.Y)
        return new Position(p1.X+dx/2,p1.Y+dy/2) 
    }
    static rotatePoint(point, center, angleRad) {
        const dx = point.X - center.X;
        const dy = point.Y - center.Y;
    
        const rotatedX = center.X + dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
        const rotatedY = center.Y + dx * Math.sin(angleRad) + dy * Math.cos(angleRad);
    
        return new Position(rotatedX, rotatedY);
    }

    distanceTo(other){
        const dx = other.X - this.#x;
        const dy = other.Y - this.#y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}