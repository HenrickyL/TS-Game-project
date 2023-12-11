export class Position{
    #x = 0
    #y = 0

    constructor(_x, _y){
        this.#x = _x
        this.#y = _y
    }

    get X(){
        return this.#x;
    }
    get Y(){
        return this.#y;
    }
}