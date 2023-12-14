import { Engine } from "./Engine/Engine.js"
import { Game } from "./Game/Game.js"


window.addEventListener('load', ()=>{
    const engine = new Engine(true)
    engine.fps = 120
    const game = new Game();
    engine.start(game)
})