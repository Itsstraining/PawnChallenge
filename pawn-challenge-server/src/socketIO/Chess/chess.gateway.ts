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
    @MessageBody() data: { user: { id, name, img } },
    @ConnectedSocket() client: any,
  ): void {
    console.log(data)
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

  @SubscribeMessage('invite') invite(
    @MessageBody() sid: string,
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.invite(client, this.server, sid)
  }

  @SubscribeMessage('joinRoom') joinRoom(
    @MessageBody() rid: string,
    @ConnectedSocket() client: any,
  ): void {
    console.log(rid)
    this.chessService.joinRoom(client, this.server, rid)
  }

  @SubscribeMessage('getUserBySID') getUserBySID(
    @MessageBody() sid: string,
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.getUserBySID(client, this.server, sid)
  }

  @SubscribeMessage('moveWithPlayer') moveWithPlayer(
    @MessageBody() data: { roomID: string, moveStr: string },
    @ConnectedSocket() client: any,
  ): void {
    this.chessService.moveWithPlayer(client, this.server, data.moveStr, data.roomID)
  }



  // createBOTXiangqi(client, server: Server) {
  //   let ffishID = this.randomID('engine')
  //   let ffish = {
  //     id: ffishID,
  //     board: this.initBOTXiangqi()
  //   }
  //   this.chessService._ffishMap.set(ffishID, ffish)
  //   if (this.chessService._userGameMap.get(client.id) != null && this.chessService._userGameMap.get(client.id).roomId == '') {
  //     let idRoom = this.randomID('room')
  //     let room: Room = new Room()
  //     room.socketID1 = client.id
  //     room.roomID = idRoom
  //     room.ffishID = ffishID
  //     this.chessService._roomMap.set(idRoom, room)
  //     this.chessService._userGameMap.get(client.id).roomId = idRoom
  //   } else if (this.chessService._userGameMap.get(client.id) != null && this.chessService._userGameMap.get(client.id).roomId != '') {
  //     let fishID = this.chessService._roomMap.get(this.chessService._userGameMap.get(client.id).roomId).ffishID
  //     if (fishID != '') {
  //       this.chessService._ffishMap.delete(fishID)
  //     }
  //     this.chessService._roomMap.get(this.chessService._userGameMap.get(client.id).roomId).ffishID = ffishID
  //   }
  //   let data = { mess: 'Create success', roomID: this.chessService._userGameMap.get(client.id).roomId, ffishid: ffishID }
  //   client.emit('onCreateBOTXiangqi', data)
  // }
  initBOTXiangqi() {
    let board = new ffish.Board("xiangqi", "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR[] w - - 0 1");
    // console.log(board.toVerboseString())
    return board
  }
  randomID(str: string) {
    let id = Date.now().toString()
    return id + '-' + str + this.getRandomInt(0, 99).toString();
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max++ - min) + min);
  }
}

