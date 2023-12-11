import {Rect, Circle} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const graphics = new Graphics()
    const p = new Position(0,0)
    const rect = new Rect(p,20,20)
    const p2 = new Position(rect.right(),p.Y)

    const circle = new Circle(p2,50)

    graphics.addObject(rect)
    graphics.addObject(circle)

    graphics.draw()
})