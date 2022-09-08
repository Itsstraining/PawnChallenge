import { IoAdapter } from "@nestjs/platform-socket.io";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "net";

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}