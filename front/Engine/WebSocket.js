import { InvalidArgumentError } from "../Errors/index.js";
import { WebSocketMessage } from "./Middleware/WebSocketMessage.js";
import { SocketEvent } from "./enums/index.js";

export class WebSocketHandler {
    #messageHandlers = []
    constructor(server) {
      this.socket = new WebSocket(server); // Substitua pelo endereço do servidor
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onclose = this.onClose.bind(this);
    }
  
    onOpen() {
      console.log('Conexão estabelecida com o servidor');
    }
  
    onMessage(event) {
      const receivedData = JSON.parse(event.data);
      this.handleMessage(receivedData);
    }
  
    handleMessage(data) {
      if (data.type) {
        console.log(data)
        this.#notifyHandlers(data.type, data);
      }
    }
    
    onError(error) {
      console.error('Erro na conexão com o servidor:', error);
    }

    send(message) {
      if (this.socket.readyState === WebSocket.OPEN ) {
        if(message instanceof WebSocketMessage){
          const jsonString = JSON.stringify(message.json());
          this.socket.send(jsonString);
        }else
          throw new InvalidArgumentError("expect WebSocketMessage argument")
      } else {
        console.error('Conexão não está aberta para enviar mensagem:', message);
      }
    }

    onClose(event) {
      console.log('Conexão fechada. Código:', event.code, ' Razão:', event.reason);
    }


    addMessageHandler(type, callback) {
      if (!this.#messageHandlers[type]) {
          this.#messageHandlers[type] = [];
      }
      this.#messageHandlers[type].push(callback);
    }
    removeMessageHandler(type, callback) {
      if (this.#messageHandlers[type]) {
          this.#messageHandlers[type] = this.#messageHandlers[type].filter(cb => cb !== callback);
      }
    }

    #notifyHandlers(type, data) {
      const handlers = this.#messageHandlers[type];
      if (handlers && handlers.length > 0) {
          handlers.forEach(callback => callback(data));
      }
    }
  }
  
  