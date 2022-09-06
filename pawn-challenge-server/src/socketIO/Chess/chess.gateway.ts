import { User } from './../../models/user.model';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChessGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChessGateway');
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  afterInit(server: Server) {
    this.logger.log('Init');
  }
  user: User;
  client: Socket;

  genRoomId() {
    var result = '';
    var length = 16;
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, @MessageBody() data: any): void {
    const roomId = this.genRoomId();
    client.join(roomId);
    client.emit('joinRoom', roomId);
  }
  @SubscribeMessage('move')
  handleMove(client: Socket, @MessageBody() data: any): void {
    const roomId = data.roomId;
    client.to(roomId).emit('move', data);
  }
  broadcastMessageToRoom(roomId: string, message: string) {
    this.server.to(roomId).emit('message', message);
  }
  broadcastMove(roomId: string, moveData: any) {
    this.server.to(roomId).emit('move', moveData);
  }
  newGame(roomId: string) {
    this.server.to(roomId).emit('newGame');
  }
  newGameRequest(roomId: string) {
    if (roomId) {
      this.server.to(roomId).emit('newGameRequest');
    }
  }
  joinRequestTo(name: string) {
    for (let i = 0; i < this.user.userName.length; i++) {
      if (this.user.userName[i] === name) {
        this.server
          .to(this.user.userName[i])
          .emit('joinRequest', this.client.id);
        break;
      }
    }
  }
  joinRoom(roomId: string, client: Socket) {
    this.server.to(roomId).emit('joinRoom', 'SERVER: user joined room');
    if (roomId) {
      client.join(roomId);
      // this.user.filter((user) => user.id === client.id)[0].roomId = roomId;
    }
  }
  
}
