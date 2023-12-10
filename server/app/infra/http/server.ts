import {createServer} from "http"
import { WebSocketManager } from "./websocket/WebSocketManager";


const server = createServer();
const webSocketManager = new WebSocketManager(server);

server.listen(3000, () => {
    console.log('Servidor WebSocket está ouvindo na porta 3000');
});