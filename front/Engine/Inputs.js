import { Position } from "./Position.js";

export class Input {
    #keys // Array para armazenar o estado das teclas
    #ctrl // Array para controlar a liberação das teclas
    #mouseWheel // Valor da roda do mouse
    #lastMouseWheelTime = Date.now();
    #mousePosition
    #canvas
    #offsetX
    #offsetY
    #mouseClickPosition
    #onClick
    #cancelClick
    constructor(canvas, cancelClick = true) {
        this.#keys = new Array(256).fill(false); 
        this.#ctrl = new Array(256).fill(false); 
        this.#mouseWheel = 0; 
        this.#lastMouseWheelTime = Date.now();
        this.#mousePosition = new Position();
        this.#canvas = canvas
        this.#mouseClickPosition = new Position()
        this.#onClick = false
        this.#cancelClick = cancelClick

        const rect = this.#canvas.getBoundingClientRect(); // Obtém as dimensões e a posição do canvas
        this.#offsetX = rect.left; // Offset X do canvas na janela do navegador
        this.#offsetY = rect.top; // Offset Y do canvas na janela do navegador

        // Adiciona ouvintes de eventos para teclado e mouse
        document.addEventListener("keydown", this.#onKeyDown.bind(this));
        document.addEventListener("keyup", this.#onKeyUp.bind(this));
        this.#canvas.addEventListener("mousemove", this.#onMouseMove.bind(this));
        this.#canvas.addEventListener("mousedown", this.#onMouseClickDown.bind(this));
        this.#canvas.addEventListener("mouseup", this.#onMouseClickUp.bind(this));
        document.addEventListener("wheel", this.#onMouseWheel.bind(this));

    }

    get keys(){
        return this.#keys
    }

    get mouseWheel(){
        return this.#mouseWheel
    }

    get ctrl(){
        return this.#ctrl
    }

    get mousePosition(){
        return this.#mousePosition
    }

    get mouseClick(){
        return this.#mouseClickPosition
    }

    keyDown(keyCode){
        return this.#keys[keyCode]
    }

    keyUp(keyCode){
        return !this.#keys[keyCode]
    }

    keyPress(keyCode) {
        if (this.#ctrl[keyCode]) {
            if (this.keyDown(keyCode)) {
                this.#ctrl[keyCode] = false;
                return true;
            }
        } else if (this.keyUp(keyCode)) {
            this.#ctrl[keyCode] = true;
        }
        return false;
    }

    // Função para lidar com o pressionamento de teclas
    #onKeyDown(event) {
        this.keys[event.keyCode] = true;
    }

    // Função para lidar com a liberação de teclas
    #onKeyUp(event) {
        this.keys[event.keyCode] = false;
        this.ctrl[event.keyCode] = false;
    }

    // Função para lidar com o movimento do mouse
    #onMouseMove(event) {
        const mouseX = event.clientX - this.#offsetX; // Posição X do mouse no canvas
        const mouseY = event.clientY - this.#offsetY; // Posição Y do mouse no canvas

        // Ajustando para o sistema de coordenadas centralizado do canvas
        this.#mousePosition.x = mouseX;
        this.#mousePosition.y = mouseY;
    }

    // Função para lidar com o clique do mouse
    #onMouseClickDown(event) {
        if(this.#cancelClick && !this.#mouseClickPosition)
            this.#mouseClickPosition = new Position()
        const mouseX = event.clientX - this.#offsetX; // Posição X do mouse no canvas
        const mouseY = event.clientY - this.#offsetY; // Posição Y do mouse no canvas

        // Ajustando para o sistema de coordenadas centralizado do canvas
        this.#mouseClickPosition.x = mouseX;
        this.#mouseClickPosition.y = mouseY;
        this.#onClick = true
    }

    #onMouseClickUp(event) {
        const mouseX = event.clientX - this.#offsetX; // Posição X do mouse no canvas
        const mouseY = event.clientY - this.#offsetY; // Posição Y do mouse no canvas

        const dx = Math.abs(this.#mouseClickPosition.x - mouseX)
        const dy = Math.abs(this.#mouseClickPosition.y - mouseY)
        if(this.#cancelClick && dx>20 && dy>20){
            this.#mouseClickPosition = null
        }else{
            this.#mouseClickPosition.x = mouseX
            this.#mouseClickPosition.y = mouseY
        }

        this.#onClick = false
    }

    #onMouseWheel(event){
        const currentTime = Date.now();
        const timeDifference = currentTime - this.#lastMouseWheelTime;

        if(timeDifference > 600){
            this.#mouseWheel = 0;
        }else{
            this.#mouseWheel += event.deltaY;
        }
        this.#lastMouseWheelTime = currentTime;
    }
}
