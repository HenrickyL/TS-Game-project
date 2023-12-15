import { Color } from "./Colors.js";
import { Movable } from './Middleware/Movable.js';

export class Text extends Movable {
    #text;
    #font;
    #size;
    #color = Color.BLACK;
    #width = null;
    #height = null;

    constructor(text, position, color = Color.BLACK, size = 16, font = 'Arial') {
        super(position);
        this.#text = text;
        this.#font = font;
        this.#color = color;
        this.#size = size;
        this.#calculateTextDimensions();
    }

    #calculateTextDimensions(context = null) {
        let tempContext = context
        if(!context){
            const tempCanvas = document.createElement('canvas');
            tempContext = tempCanvas.getContext('2d');
        }
        tempContext.save()
        tempContext.font = `${this.#size}px ${this.#font}`;
        const textMetrics = tempContext.measureText(this.#text);
        this.#width = textMetrics.width;
        this.#height = this.#size;
        tempContext.restore()
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
        this.#calculateTextDimensions();
        // this.translateTo(-this.width/2, 0)
    }

    get font() {
        return this.#font;
    }

    set font(font) {
        this.#font = font;
        this.#calculateTextDimensions();
    }

    set size(size_px){
        this.#size = size_px;
        this.#calculateTextDimensions();
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

        // Calcula as dimensões do texto
        const textMetrics = context.measureText(this.#text);
        const textWidth = textMetrics.width;

        context.translate(this.position.x, this.position.y);
        context.rotate(this._rotateRad);
        context.fillText(this.#text, -textWidth / 2, this.#size / 2);
        context.restore();
    }
}
