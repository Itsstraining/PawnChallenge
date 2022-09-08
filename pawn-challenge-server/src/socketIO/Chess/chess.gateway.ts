import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "net";
import { ChessControl, Room, UserGame } from "src/models/SocketModel.model";
import { Timer } from "src/models/timer";
import { User } from "src/schemas/user.schema";
import { Injectable } from '@nestjs/common';
import * as ffish from 'ffish';
import { Move } from "src/models/move.model";

@WebSocketGateway({ cors: '*: *' })
@WebSocketGateway()
export class ChessGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  _userGameMap: Map<string, UserGame>
  _roomMap: Map<string, Room>
  _engineMap: Map<string, { id: string, board: any }>

  constructor() {
    this._userGameMap = new Map()
    this._roomMap = new Map()
    this._engineMap = new Map()
  }
  handleConnection(client: any, ...args: any[]) {
    // console.log(`client connected: ${socket.id}`);
  }
  handleDisconnect(client: any, ...args: any[]) {
    // console.log(`client disconnected: ${socket.id}`);
    if (this._userGameMap.get(client.id).roomId != '') {
      let room = this._roomMap.get(this._userGameMap.get(client.id).roomId)
      if (room != null) {
        if (room.socketID1 == client.id) room.socketID1 = ''
        if (room.socketID2 == client.id) room.socketID2 = ''
        if (room.ffishID != '') {
          this._engineMap.get(room.ffishID).board.delete()
          this._engineMap.delete(room.ffishID)
        }
        if (room.socketID1 == '' && room.socketID1 == '') this._roomMap.delete(room.roomID)
      }
    }
    this._userGameMap.delete(client.id)
  }
  afterInit(server: any) {
  }

  @SubscribeMessage('connectServer')
  handleConncectServer(
    @MessageBody() data: { user: { id, name } },
    @ConnectedSocket() client: any,
  ): void {
    this._userGameMap.set(client.id, new UserGame(
      data.user.id ?? '',
      data.user.name ?? '',
      client.id,
      '', false,
      new ChessControl('', '', new Timer())
    ))
    this.server.emit('onConnected', client.id)
  }

  @SubscribeMessage('createBOTXiangqi')
  createBOTXiangqiWithSID(
    @ConnectedSocket() client: any,
  ): void {
    let idRoom = this.randomID('room')
    let idFfish = this.randomID('engine')
    let room: Room = new Room()
    room.socketID1 = client.id
    room.roomID = idRoom
    room.ffishID = idFfish
    let ffish = {
      id: idFfish,
      board: this.initBOTXiangqi()
    }
    this._engineMap.set(idFfish, ffish)
    this._roomMap.set(idRoom, room)
    this._userGameMap.get(client.id).roomId = idRoom
    let data = { mess: 'Create success', roomID: idRoom, ffishid: idFfish }
    this.server.emit('onCreateBOTXiangqi', data)

  }

  @SubscribeMessage('setMoveOn') setMove(
    @MessageBody() data: { ffishID: string, move: string },
    @ConnectedSocket() client: any,
  ): void {
    this._engineMap.get(data.ffishID).board.push(data.move);
    let legalMoves: string[] = this._engineMap.get(data.ffishID).board.legalMoves().split(" ");
    let move = legalMoves[this.getRandomInt(0, legalMoves.length)]
    let dataRes = { moveTo: move }
    this._engineMap.get(data.ffishID).board.push(move);
    this.server.emit('onSetMoveOn', dataRes)
  }

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