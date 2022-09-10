import { Injectable } from '@nestjs/common';
import { ChessControl, Room, UserGame } from 'src/models/SocketModel.model';
import { Timer } from 'src/models/timer';
import { Server } from "http";
import * as ffish from 'ffish';
import console from 'console';

@Injectable()
export class ChessService {
    _userGameMap: Map<string, UserGame>
    _roomMap: Map<string, Room>
    _ffishMap: Map<string, { id: string, board: any }>

    constructor() {
        this._userGameMap = new Map()
        this._roomMap = new Map()
        this._ffishMap = new Map()
    }

    connect(client, server: Server, user: { id, name, img }) {
        try {
            this._userGameMap.set(client.id, new UserGame(
                user.id ?? '',
                user.name ?? '',
                client.id,
                '', false,
                new ChessControl('', '', new Timer()),
                user.img
            ))
            client.emit('onConnected', client.id)
        } catch (error) {
            console.log(error)
        }
    }

    disconnect(client, server: Server) {
        try {
            if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId != '') {
                let room = this._roomMap.get(this._userGameMap.get(client.id).roomId)
                if (room != null) {
                    if (room.socketID1 == client.id) room.socketID1 = ''
                    if (room.socketID2 == client.id) room.socketID2 = ''
                    if (room.ffishID != '') {
                        this._ffishMap.get(room.ffishID).board.delete()
                        this._ffishMap.delete(room.ffishID)
                    }
                    if (room.socketID1 == '' && room.socketID2 == '') this._roomMap.delete(room.roomID)
                }
            }
            this._userGameMap.delete(client.id)
            if (this._userGameMap.size == 0) {
                this._roomMap.clear()
                this._ffishMap.clear()
            }
        } catch (error) {
            console.log(error)
        }
    }

    createBOTXiangqi(client, server: Server) {
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
            // console.log(`Có ${this._ffishMap.size} con cá (0.o)`)
            client.emit('onCreateBOTXiangqi', data)
        } catch (error) {
            console.log(error)
        }
    }

    setBOTMove(client, server: Server, data: { ffishID: string, move: string }) {
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

    killFFish(client, server: Server, ffishID: string) {
        try {
            if (this._userGameMap.get(client.id) != null && this._userGameMap.get(client.id).roomId != '') {
                this._roomMap.get(this._userGameMap.get(client.id).roomId).ffishID = ''
                this._ffishMap.delete(ffishID)
            }
        } catch (error) {
            console.log(error)
        }
    }

    invite(client, server: Server, sidUserInvit: string) {
        let userInvite = this._userGameMap.get(sidUserInvit)
        if (userInvite != null && client.id != sidUserInvit) {
            client.emit('onInviteSS', true)
            server.emit('onInvite', {
                currenID: sidUserInvit,
                roomID: this._userGameMap.get(client.id).roomId,
                nameInvite: this._userGameMap.get(client.id).name
            })
        } else {
            client.emit('onInviteSS', false)
        }

    }

    createRoom(client, server: Server) {
        try {
            if (this._userGameMap.get(client.id).roomId != '') {
                let roomGet = this._roomMap.get(this._userGameMap.get(client.id).roomId)
                if (roomGet != null) {
                    if (roomGet.socketID1 == client.id) roomGet.socketID1 = ''
                    if (roomGet.socketID2 == client.id) roomGet.socketID2 = ''
                    this._roomMap.set(roomGet.roomID, roomGet)
                }
            }
            let roomID = this.randomID('room')
            this._userGameMap.get(client.id).roomId = roomID
            let room = new Room()
            room.roomID = roomID
            room.socketID1 = client.id
            this._roomMap.set(roomID, room)
            client.emit('onCreateRoomSucess', roomID)
        } catch (error) {
            console.log(error)
        }
    }

    joinRoom(client, server: Server, roomID: string) {
        try {
            if (this._roomMap.get(this._userGameMap.get(client.id).roomId).roomID != '') {
                this._roomMap.delete(this._userGameMap.get(client.id).roomId)
            }
            let getRoom = this._roomMap.get(roomID)
            getRoom.socketID2 = client.id
            this._userGameMap.get(client.id).roomId = roomID
            this._roomMap.set(getRoom.roomID, getRoom)
            server.emit('onJoinSucces',
                {
                    roomID: roomID,
                    player: { username: this._userGameMap.get(getRoom.socketID1).name, img: this._userGameMap.get(getRoom.socketID1).img }
                    , room: this._roomMap.get(roomID)
                })
        } catch (error) {
            console.log(error)
        }
    }

    moveWithPlayer(client, server: Server, moveStr, roomID) {
        server.emit('onChessMove', roomID, moveStr)
    }



    getUserBySID(client, server: Server, sid: string) {
        try {
            client.emit('onGetUserBySID', this._userGameMap.get(sid))
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
