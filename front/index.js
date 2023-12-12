import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point, Circle, Polygon} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import { Input } from "./Engine/Inputs.js"
import { Object } from "./Engine/Object.js"
import {Position} from "./Engine/Position.js"
import { Scene } from "./Engine/Scene.js"
import { ObjectGroup, InputKeys } from "./Engine/enums/index.js"




window.addEventListener('load', ()=>{
    const graphics = new Graphics()
    const input = new Input(graphics.canvas)
    let start = true
    
    // const scene = new Scene()
    // const p1 = graphics.Center
    // const p2 = new Position(p1.x, p1.y+24)


    // const bbox1 = new Rect(p1, 30,30)
    // // const bbox2 = new Rect(p2, 10,10)
    // // const bbox2 = new Point(p2)
    // const bbox2 = new Circle(p2, 10)
    // bbox1.color = Color.BLUE

    // bbox2.color = Color.RED


    // const obj = new Object(p1, bbox1)
    // const obj2 = new Object(p2, bbox2)
    
    // scene.add(obj,  ObjectGroup.MOVING)
    // scene.add(obj2,  ObjectGroup.MOVING)
    
    
    // graphics.addObject(scene)
    // graphics.draw()
    // scene.collisionDetection()
})