import { Engine } from "./Engine/Engine.js"
import { Game } from "./Game/Game.js"
import { WebSocketHandler } from "./WebSocket.js"

window.addEventListener('load', ()=>{
    const ws = new WebSocketHandler("ws://localhost:3000")

    const engine = new Engine()
    const game = new Game();
    engine.start(game)
})