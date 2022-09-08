import { IoAdapter } from "@nestjs/platform-socket.io";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "net";

<<<<<<< HEAD:pawn-challenge-server/src/socketIO/Gateways/chat.gateway.ts
@WebSocketGateway({ cors: '*:*' })
=======
@WebSocketGateway({ cors: '*: *' })
@WebSocketGateway()
>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8:pawn-challenge-server/src/socketIO/Chat/chat.gateway.ts
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  str = ''
  _userArray = [
    
  ]
  

  @SubscribeMessage('connectMess')
  handleConnect(@MessageBody() message: string): void {
    this.server.emit('message', message);
    // IoAdapter
  }

  @SubscribeMessage('message1')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
<<<<<<< HEAD:pawn-challenge-server/src/socketIO/Gateways/chat.gateway.ts
=======
    console.log(message)
    // IoAdapter
>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8:pawn-challenge-server/src/socketIO/Chat/chat.gateway.ts
  }


}