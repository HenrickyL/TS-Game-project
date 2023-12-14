import {Color} from "./Colors.js"
export class Text {
    #position
    #text
    #font
    #size
    #color = Color.BLACK
    #width
    #height
    

    constructor(text, position, color = Color.BLACK, size = 16, font = 'Arial') {
        this.#position = position;
        this.#text = text;
        this.#font = font;
        this.#color = color;
        this.#size = size
        this.#calculateTextDimensions()
    }

    #calculateTextDimensions() {
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempContext.font = `${this.#size}px ${this.#font}`;
        const textMetrics = tempContext.measureText(this.#text);
        this.#width = textMetrics.width;
        this.#height = this.#size;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get position() {
        return this.#position;
    }

    set position(position) {
        this.#position = position;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
    }

    get font() {
        return this.#font;
    }

    set font(font) {
        this.#font = font;
    }
    set size(size_px){
        this.#size = size_px
    }

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
    }

    draw(context) {
        context.save();
        context.font = `${this.#size}px ${this.#font}`;
        context.fillStyle = this.color.RGBA;
        context.fillText(this.#text, this.#position.x, this.#position.y);
        context.restore();
    }
}
