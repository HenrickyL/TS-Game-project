import {createServer} from "http"
import { WebSocketManager } from "./websocket/WebSocketManager";
import cors from 'cors'
import express from 'express'
import { Game } from "@core/entities/Game";

const api = express()
api.use(cors());

const server = createServer(api);
const webSocketManager = new WebSocketManager(server);

server.listen(3000, () => {
    console.log('Servidor WebSocket está ouvindo na porta 3000');
});
