import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point, Circle, Polygon} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const graphics = new Graphics()
    const p1 = graphics.Center

    const poly = new Polygon(p1,[
        new Position(20,30),
        new Position(200,50),
        new Position(100,60),
        new Position(200,500),
        
    ])
    

    graphics.addObject(poly)


    graphics.draw()
})