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

    set fps(_fpd){
        this.#fps = _fpd
    }

    get fps(){
        return this.#fps
    }


    #loop(){
        this.#timer.startTimer()
        // this.#game.init();

        if(this.#input.keyPress(InputKeys.PAUSE)){
            this.#onPause  = !this.#onPause 
            console.log("pause")
        }

        //gameLoop
        requestAnimationFrame(
            this.#isVariableRate?this.#mainLoopVariable : this.#mainLoopConstant
        )

        this.#timer.stopTimer()
        // this.#game.finalize();
    }

    #mainLoopConstant = (timestamp)=>{
        const deltaTime = (timestamp - this.#lastTime) / 1000;

        this.#mainLoop()

        this.#lastTime = timestamp;
        requestAnimationFrame(this.#mainLoopConstant);
    }

    #mainLoopVariable = (timestamp)=>{
        const currentTime = timestamp || 0;
        const elapsed = currentTime - this.#lastTime;
      
        if (elapsed > this.#frameDuration) {
            this.#mainLoop()
            this.#lastTime = currentTime - (elapsed % this.#frameDuration);
        }
        requestAnimationFrame(this.#mainLoopVariable);
    }


    #mainLoop(){
        if(this.#onPause){
            // this.#game.update()
            this.#graphics.clear()
            // this.#game.draw(this.#graphics.context)
        }
    }
}