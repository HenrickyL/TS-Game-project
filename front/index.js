import { Color } from "./Engine/Colors.js"
import {Rect, Circle} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const graphics = new Graphics()
    const p = graphics.Center
    const rect = new Rect(p,50,20)

    graphics.addObject(rect)

    graphics.draw()
})