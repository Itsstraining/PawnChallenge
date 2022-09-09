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
  _ffishMap: Map<string, { id: string, board: any }>

  constructor() {
    this._userGameMap = new Map()
    this._roomMap = new Map()
    this._ffishMap = new Map()
  }
  handleConnection(client: any, ...args: any[]) {
    // console.log(`client connected: ${socket.id}`);
  }
  handleDisconnect(client: any, ...args: any[]) {
    try {
      // console.log(`client disconnected: ${socket.id}`);
      if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId != '') {
        let room = this._roomMap.get(this._userGameMap.get(client.id).roomId)
        if (room != null) {
          if (room.socketID1 == client.id) room.socketID1 = ''
          if (room.socketID2 == client.id) room.socketID2 = ''
          if (room.ffishID != '') {
            this._ffishMap.get(room.ffishID).board.delete()
            this._ffishMap.delete(room.ffishID)
          }
          if (room.socketID1 == '' && room.socketID1 == '') this._roomMap.delete(room.roomID)
        }
      }
      this._userGameMap.delete(client.id)
      if(this._userGameMap.size==0){
        this._roomMap.clear()
        this._ffishMap.clear()
      }
    } catch (error) {
      console.log(error)
    }
  }
  afterInit(server: any) {
  }

  @SubscribeMessage('connectServer')
  handleConncectServer(
    @MessageBody() data: { user: { id, name } },
    @ConnectedSocket() client: any,
  ): void {
    try {
      this._userGameMap.set(client.id, new UserGame(
        data.user.id ?? '',
        data.user.name ?? '',
        client.id,
        '', false,
        new ChessControl('', '', new Timer())
      ))
      client.emit('onConnected', client.id)
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('createBOTXiangqi')
  createBOTXiangqiWithSID(
    @ConnectedSocket() client: any,
  ): void {
    try {
      let ffishID = this.randomID('engine')
      let ffish = {
        id: ffishID,
        board: this.initBOTXiangqi()
      }
      this._ffishMap.set(ffishID, ffish)
      if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId == '') {
        let idRoom = this.randomID('room')
        let room: Room = new Room()
        room.socketID1 = client.id
        room.roomID = idRoom
        room.ffishID = ffishID
        this._roomMap.set(idRoom, room)
        this._userGameMap.get(client.id).roomId = idRoom
      } else if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId != '') {
        let fishID = this._roomMap.get(this._userGameMap.get(client.id).roomId).ffishID
        if (fishID != '') {
          this._ffishMap.delete(fishID)
        }
        this._roomMap.get(this._userGameMap.get(client.id).roomId).ffishID = ffishID
      }
      let data = { mess: 'Create success', roomID: this._userGameMap.get(client.id).roomId, ffishid: ffishID }
      console.log(`Có ${this._ffishMap.size} con cá (0.o)`)
      client.emit('onCreateBOTXiangqi', data)
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('setMoveOnBOT') setMoveOnBOT(
    @MessageBody() data: { ffishID: string, move: string },
    @ConnectedSocket() client: any,
  ): void {
    try {
      if (this._ffishMap.get(data.ffishID) != null) {
        this._ffishMap.get(data.ffishID).board.push(data.move);
        let legalMoves: string[] = this._ffishMap.get(data.ffishID).board.legalMoves().split(" ");
        let move = legalMoves[this.getRandomInt(0, legalMoves.length)]
        let dataRes = { moveTo: move }
        this._ffishMap.get(data.ffishID).board.push(move);
        client.emit('onSetMoveOnBOT', dataRes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  @SubscribeMessage('killFfish') killFfish(
    @MessageBody() ffishID: string,
    @ConnectedSocket() client: any,
  ): void {
    try {
      if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId != '') {
        this._roomMap.get(this._userGameMap.get(client.id).roomId).ffishID = ''
        this._ffishMap.delete(ffishID)
      }
    } catch (error) {
      console.log(error)
    }
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