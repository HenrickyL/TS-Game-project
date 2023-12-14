import { Engine } from "./Engine/Engine.js"
import { Game } from "./Game/Game.js"

window.addEventListener('load', ()=>{
    const engine = new Engine()
    const game = new Game();
    engine.start(game)
})