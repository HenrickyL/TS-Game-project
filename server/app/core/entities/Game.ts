import {IGame} from "./IGame"
import {v4 as uuid} from 'uuid'
import { Player } from "./Player"


export class Game implements IGame{
    private readonly maxPlayer: number = 2
    private players: Player[]
    private id: string
    constructor(){
        this.players = []
        this.id = uuid()
    }

    get Id():string{
        return this.id
    }

    get Players(): Player[]{
        return this.players
    }

    update(): void {
        throw new Error("Method not implemented.");
    }


    addPlayer(player: Player):void{
        if(this.players.length <= this.maxPlayer){
            this.players.push(player)
        }
    }
    
}