import { Engine } from "./Engine/Engine.js"
import { WebSocketHandler } from "./Engine/WebSocket.js"
import { Game } from "./Game/Game.js"

window.addEventListener('load', ()=>{
    const ws = new WebSocketHandler("ws://localhost:3000")
    const engine = new Engine()
    engine.webSocket = ws
    const game = new Game();
    engine.start(game)
})