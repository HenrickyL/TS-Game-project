export class Game{
    #id
    #players = []
    #start = false
    #pause = false
    constructor(id){
        this.#id = id
    }


    set Start(start){
        this.#start = start
    }

    set Pause(pause){
        this.#pause = pause
    }

    addPlayer(player){
        this.#players.push(player)
    }
    //-------------------------------------
    update(){

    }


    draw(constext){

    }
}