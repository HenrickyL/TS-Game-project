import { Engine } from "./Engine/Engine.js"
import { Game } from "./Game/Game.js"
import {Text} from "./Engine/Text.js"
import { Position } from "./Engine/Position.js"
import { Graphics } from "./Engine/Graphics.js"

window.addEventListener('load', ()=>{
    // const engine = new Engine()
    // const game = new Game();
    // engine.start(game)
    const graphics = new Graphics()
    const pos = new Position(30,30);


    const text = new Text("Hello World", graphics.middleRight)
    text.draw(graphics.context)
    
})