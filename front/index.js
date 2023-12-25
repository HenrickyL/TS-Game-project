import { Renderer3D } from "./3D/Renderer3D.js"
import { Test3d } from "./3D/Test3d.js"
import {Input} from './Engine/Input.js'
import { InputKeys } from "./Engine/enums/index.js"
window.addEventListener('load', ()=>{
    // const ws = new WebSocketHandler("ws://localhost:3000")
    // const engine = new Engine()
    // engine.webSocket = ws
    // const game = new Game();
    // engine.start(game)

    const test = new Test3d()
    const graph = new Renderer3D(800,600)

    const forms = [
        test.getCube(),
        test.getHexagonalPrism(),
        test.getPyramid(),
        test.getSphere()
    ]
    let index = 0
    let mesh = forms[index]
    console.log("start")

    const input = new Input(graph.canvas)
    let angleX = 0
    let angleZ = 0
    let isColor = false
    let isPoint = false
    let z = 1
    let tick = 0.2
    setInterval(()=>{
        if(input.keyDown(InputKeys.LEFT_ARROW)){
            angleX += 1
        }else if(input.keyDown(InputKeys.RIGHT_ARROW)) {
            angleX -= 1
        }
        if(input.keyPress(InputKeys.A)){
            isPoint = !isPoint
        }

        if(input.keyPress(InputKeys.SPACE)){
            index = (index + 1) % forms.length
            mesh = forms[index]
        }

        if(input.keyDown(InputKeys.W)){
            z+=tick
           graph.z = z
        }

        if(input.keyDown(InputKeys.S)){
            z-=tick
           graph.z = z
        }


        if(input.keyPress(InputKeys.D)){
            isColor = !isColor
        }

        if(input.keyDown(InputKeys.DOWN_ARROW)){
            angleZ += 1
        }else if(input.keyDown(InputKeys.UP_ARROW)) {
            angleZ -= 1
        }
    }, 100)

    setInterval(()=>{
        graph.update(angleX, angleZ)
        graph.render(mesh.triangles, {isPoint, isColor})
    }, 1000/45)
})