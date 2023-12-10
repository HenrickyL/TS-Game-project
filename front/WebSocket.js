class WebSocketHandler {
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
      console.log(`Mensagem recebida do servidor: `, receivedData);
      // Lógica para processar a mensagem recebida do servidor
      this.handleMessage(message);
    }
  
    onError(error) {
      console.error('Erro na conexão com o servidor:', error);
    }
  
    handleMessage(message) {
      // Lógica para processar as mensagens recebidas do servidor
    }
  
    sendMessage(message) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.error('Conexão não está aberta para enviar mensagem:', message);
      }
    }

    onClose(event) {
      console.log('Conexão fechada. Código:', event.code, ' Razão:', event.reason);
    }
  }
  
  export {WebSocketHandler};
  