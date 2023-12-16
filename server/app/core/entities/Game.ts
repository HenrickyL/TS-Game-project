import {v4 as uuid} from 'uuid'
import { Player } from "./Player"
import { GameStatus } from "@core/enums/GameStatus"
import { IGame, IVector } from "@core/DTOs"


export class Game{
    private readonly maxPlayer: number = 2
    private players: Player[]
    private id: string
    private status: GameStatus = GameStatus.PAUSE
    private initialDirection :IVector

    constructor(){
        this.players = []
        this.id = uuid()
        this.initialDirection = {x:getDirection(), y: getDirection()}
    }

    get Id():string{
        return this.id
    }

    get info(): IGame{
        return {
            id: this.Id,
            initialDirection: this.initialDirection
        }
    }

    get Players(): Player[]{
        return this.players
    }
    get Status(): GameStatus{
        return this.status
    }

    update(): void {
        throw new Error("Method not implemented.");
    }


    addPlayer(player: Player):void{
        if(this.players.length <= this.maxPlayer){
            this.players.push(player)
        }
    }

    public setStatus(status: GameStatus):void{
        this.status = status
    }
    
}


function getDirection(): number {
    return Math.floor(Math.random()*100) % 2 == 0 ? 1 : -1; 
}