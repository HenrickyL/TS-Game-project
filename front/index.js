import {WebSocketHandler} from './WebSocket.js'

window.addEventListener('load', ()=>{
    const socket = new WebSocketHandler("ws://localhost:3000");
    
    setTimeout(()=>{
        console.log('enviei')
        const messageToSend = 'Olá, servidor! Estou testando a comunicação.';
        socket.sendMessage(messageToSend);
    }, 5000)

})