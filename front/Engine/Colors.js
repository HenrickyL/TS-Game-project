export class Color {
    #r
    #g
    #b
    #a
    constructor(r, g, b, a = 1.0) {
        this.#r = r;
        this.#g = g;
        this.#b = b;
        this.#a = a;
    }

    get r(){
        return this.#r
    }
    get g(){
        return this.#g
    }
    get b(){
        return this.#b
    }
    get alpha(){
        return this.#a
    }

    set alpha(a){
        this.#a = a
    }

    get RGBA() {
        return `rgba(${this.r},${this.g},${this.b},${this.alpha})`;
    }

    static get RED() {
        return new Color(255, 0, 0);
    }

    static get BLUE() {
        return new Color(0, 0, 255);
    }

    static get GREEN() {
        return new Color(0, 255, 0);
    }

    static get YELLOW() {
        return new Color(255, 255, 0);
    }

    static get BLACK() {
        return new Color(0, 0, 0);
    }

    static get WHITE() {
        return new Color(255, 255, 255);
    }
}