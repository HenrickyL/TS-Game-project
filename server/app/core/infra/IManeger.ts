import {IRoomManeger} from "./IRoomManeger"
import {ISocketManeger} from "./ISocketManeger"



export interface IManeger<ISocket> extends IRoomManeger, ISocketManeger<ISocket>{

}