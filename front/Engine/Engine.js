import { GameNotDefinedInEngineError } from "../Errors/index.js"
import { Graphics } from "./Graphics.js"
import { Input } from "./Input.js"
import { Timer } from "./Timer.js"
import {InputKeys} from './enums/index.js'
export class Engine{
    #isVariableRate
    #fps = 60
    #frameDuration = 1000/60
    #lastTime = 0
    #timer
    #input
    #game
    #graphics
    #screenWidth = 800
    #screenHeight = 600
    #onPause = false
    #frames = 0
    #elapsed = 0
    #webSocket

    constructor(isVariableRate = true){
        this.#isVariableRate = isVariableRate
        this.#graphics = new Graphics(this.#screenWidth, this.#screenHeight)
        this.#timer = new Timer()
        this.#lastTime = 0
    }

    start(game){
        this.#game = game
        this.#input = new Input(this.#graphics.canvas)
        this.#loop()
    }
    set webSocket(ws){
        this.#webSocket = ws
    }
    set fps(_fpd){
        this.#fps = _fpd
        this.#frameDuration = 1000/this.#fps
    }

    get fps(){
        return this.#fps
    }

    get context(){
        return this.#graphics.context
    }

    get input(){
        return this.#input
    }


    #loop(){
        this.#timer.startTimer()
        if(!this.#game)
            throw new GameNotDefinedInEngineError();
        this.#game.init(this.#graphics, this.input, this.#webSocket);
        
        //gameLoop
        requestAnimationFrame(
            this.#isVariableRate?this.#mainLoopVariable : this.#mainLoopConstant
        )

        this.#timer.stopTimer()
        // this.#game.finalize();
    }

    #verifyPause(){
        if(this.input.keyPress(InputKeys.PAUSE)){
            this.#onPause  = !this.#onPause 
            console.log("pause")
        }
    }
    #mainLoopVariable   = (timestamp)=>{
        const elapsed = timestamp - this.#lastTime;
        this.#lastTime = timestamp;
        this.#elapsed += elapsed;
        this.#frames++;
        if (this.#elapsed > 1000) {
            this.#fps = Math.floor((this.#frames / this.#elapsed) * 1000);
            // console.log(`FPS: ${this.#fps}`);
            this.#frames = 0;
            this.#elapsed = 0;
        }
        this.#mainLoop()
        requestAnimationFrame(this.#mainLoopVariable);
    }

    #mainLoopConstant = (timestamp)=>{
        const currentTime = timestamp || 0;
        const elapsed = currentTime - this.#lastTime;
      
        if (elapsed > this.#frameDuration) {
            this.#mainLoop()
            this.#lastTime = currentTime - (elapsed % this.#frameDuration);
        }
        requestAnimationFrame(this.#mainLoopConstant);
    }


    #mainLoop(){
        this.#verifyPause()
        if(!this.#onPause){
            this.#game.update()
            this.#graphics.clear()
            this.#game.draw()
        }
    }
}