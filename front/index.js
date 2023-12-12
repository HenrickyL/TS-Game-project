import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import {Position} from "./Engine/Position.js"


window.addEventListener('load', ()=>{
    // const socket = new WebSocketHandler("ws://localhost:3000");
    const graphics = new Graphics()
    const p1 = new Position(50,200)
    const p2 = new Position(300,200)
    const line = new Line(p1, p2)

    const Point1 = new Point(line.start)
    const Point2 = new Point(line.end)
    const Point3 = new Point(line.Position)
    Point3.color = new Color(255,0,0)


    graphics.addObject(line)
    graphics.addObject(Point1)
    graphics.addObject(Point2)
    graphics.addObject(Point3)




    graphics.draw()
})