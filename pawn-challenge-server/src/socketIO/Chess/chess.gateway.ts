import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "net";
import { ChessControl, Room, UserGame } from "src/models/SocketModel.model";
import { Timer } from "src/models/timer";
import { User } from "src/schemas/user.schema";
import { Injectable } from '@nestjs/common';
import * as ffish from 'ffish';
import { Move } from "src/models/move.model";
import { ChessService } from "./chess.service";

@WebSocketGateway({ cors: '*: *' })
@WebSocketGateway()
export class ChessGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chessService: ChessService) { }

  handleDisconnect(client: any, ...args: any[]) {
    this.chessService.disconnect(client, this.server)
  }

  @SubscribeMessage('connectServer')
  handleConncectServer(
    @MessageBody() data: { user: { id, name, avatar } },
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.connect(client, this.server, data.user)
  }

  @SubscribeMessage('createBOTXiangqi')
  createBOTXiangqiWithSID(
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.createBOTXiangqi(client, this.server)
  }

  @SubscribeMessage('setMoveOnBOT') setMoveOnBOT(
    @MessageBody() data: { ffishID: string, move: string },
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.setBOTMove(client, this.server, data)
  }

  @SubscribeMessage('killFfish') killFfish(
    @MessageBody() ffishID: string,
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.killFFish(client, this.server, ffishID)
  }

  @SubscribeMessage('createRoom') createRoom(
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.createRoom(client, this.server)
  }
}