export class Colorable {
    _color;

    constructor(color) {
        this._color = color;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }
}
