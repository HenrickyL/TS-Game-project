import { Color } from "../Colors.js";
import { Rect } from "../Geometry.js";
import { Movable } from "./Movable.js";
import {Text} from '../Text.js'

export class Button extends Movable{
    #bgColor
    #txtColor
    #title
    #size
    

    #background
    #titleObj
    constructor(title, size, position, txtColor = Color.BLACK, bgColor= Color.BLUE){
        super(position)
        this.#bgColor = bgColor
        this.#txtColor = txtColor
        this.#title = title
        this.#size = size

        this.#titleObj = new Text(this.#title, this.position, this.#txtColor, this.#size )
        const width = this.#titleObj.width*2
        this.#background = new Rect(this.position,width, this.#size*2,this.#bgColor)
        this.#background.color = this.#bgColor
    }

    get background(){
        return this.#background
    }

    draw(context){
        this.#background.draw(context)
        this.#titleObj.draw(context)
    }

    moveTo(position){
        super.moveTo(position)
        this.#background.moveTo(position)
        this.#titleObj.moveTo(position)
    }
}