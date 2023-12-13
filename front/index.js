import { Color } from "./Engine/Colors.js"
import {Rect, Line, Point, Circle, Polygon} from "./Engine/Geometry.js"
import {Graphics} from "./Engine/Graphics.js"
import { Input } from "./Engine/Input.js"
import { Object } from "./Engine/Object.js"
import {Position} from "./Engine/Position.js"
import { Scene } from "./Engine/Scene.js"
import { ObjectGroup, InputKeys } from "./Engine/enums/index.js"
import {Timer} from './Engine/Timer.js'
import { Engine } from "./Engine/Engine.js"




window.addEventListener('load', ()=>{
    const engine = new Engine()
    engine.start()
})