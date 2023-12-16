import {v4 as uuid} from 'uuid'
import { Player } from "./Player"
import { GameStatus } from "@core/enums/GameStatus"
import { IGame, IVector } from "@core/DTOs"
import { Ball } from './Ball'


export class Game{
    private readonly maxPlayer: number = 2
    private playerLeft: Player 
    private playerRight: Player 
    private id: string
    private status: GameStatus = GameStatus.PAUSE
    private ball : Ball
    private players: Player[] = []

    constructor(player1: Player, player2: Player){
        this.id = uuid()
        this.playerLeft = player1
        this.playerRight = player2

        this.players.push(this.playerLeft)
        this.players.push(this.playerRight)
        const direction : IVector = {x:getDirection(), y: getDirection()}
        this.ball = new Ball(direction)
    }

    getBall(): Ball{
        return this.ball
    }
    get Id():string{
        return this.id
    }

    get PlayerLeft():Player{
        return this.playerLeft
    }
    get PlayerRight():Player{
        return this.playerRight
    }

    get Players():Player[]{
        return this.players
    }

    get info(): IGame{
        return {
            id: this.Id,
            initialDirection: this.ball.direction
        }
    }
    
    get Status(): GameStatus{
        return this.status
    }

    get Score(){
        return {left: this.playerLeft.Score, right: this.playerRight.Score}
    }
    update(): void {
        const ball = this.ball
        ball.update()
        if(ball.Position.x < 0){
            this.playerRight.increaseScore()
        }
        if(ball.Position.x > 800){
            this.playerLeft.increaseScore()
        }
    }

    public setStatus(status: GameStatus):void{
        this.status = status
    }
    
}


function getDirection(): number {
    return Math.floor(Math.random()*100) % 2 == 0 ? 1 : -1; 
}