import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point, Circle} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const graphics = new Graphics()
    const p1 = new Position(50,200)
    const circle = new Circle(p1, 20)
    circle.color = new Color(255,0,0)
    

    graphics.addObject(circle)


    graphics.draw()
})