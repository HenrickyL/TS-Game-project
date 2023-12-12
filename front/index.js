import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point, Circle, Polygon} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import { Input } from "./Engine/Inputs.js"
import { Object } from "./Engine/Object.js"
import {Position} from "./Engine/Position.js"
import { Scene } from "./Engine/Scene.js"
import { ObjectGroup, InputKeys } from "./Engine/enums/index.js"
import {Timer} from './Engine/Timer.js'



window.addEventListener('load', ()=>{
    const graphics = new Graphics()
    const input = new Input(graphics.canvas)
    const timer  = new Timer()
    timer.startTimer()
    const p1 = input.mousePosition
    const point = new Point(p1, false)
    point.position = p1
    
    graphics.addObject(point)
    

    setInterval(()=>{
        graphics.draw()
        console.log(timer.getElapsedSeconds())
        console.log(timer.getElapsedMiliSeconds())
        
    },500)

    setTimeout(()=>{
        timer.resetTimer()
    },5000)
})