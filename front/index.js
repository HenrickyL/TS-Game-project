import {Rect} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const rect = new Rect(new Position(20,20),20,20)
    const graphics = new Graphics()
    graphics.addObject(rect)
    graphics.draw()
})