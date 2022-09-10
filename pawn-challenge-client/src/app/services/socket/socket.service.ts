import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../auth/auth.service';
import { ShareService } from '../share/share.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketID = ''
  roomID = ''
  ffishID = ''

  constructor(public socket: Socket, private auth: AuthService, private shareService: ShareService) {
    this.connectServer()
  }

  connectServer() {
    if (this.auth.user1.id == '') {
      return
    }
    if (this.socketID != '') return
    let data = { user: this.auth.user1 }
    this.socket.emit('connectServer', data)
    this.socket.fromEvent<any>('onConnected').subscribe((e) => {
      this.socketID = e
      console.log(`my socket: [${e}]`)

      this.socket.emit('createRoom')
      this.socket.fromEvent<any>('onCreateRoomSucess').subscribe((e) => {
        this.roomID = e
        console.log(`my room: [${e}]`)
      })
    })
  }

  createBOTXiangqi() {
    this.socket.emit('createBOTXiangqi')
    this.socket.fromEvent<any>('onCreateBOTXiangqi').subscribe((data: { mess: string, roomID: string, ffishid: string }) => {
      console.log(data.mess)
      this.roomID = data.roomID
      this.ffishID = data.ffishid
    })
  }
  setMoveOnPlayer(moveStr: string) {
    let data = { roomID: this.roomID, moveStr: moveStr }
    this.socket.emit('moveWithPlayer', data)
  }
  setMoveOnBOT(moveStr: string) {
    let data = { ffishID: this.ffishID, move: moveStr }
    this.socket.emit('setMoveOnBOT', data)
    return this.socket.fromEvent<any>('onSetMoveOnBOT')
  }
  killFfish() {
    this.socket.emit('killFfish', this.ffishID)
  }


  randomID() {
    let id = Date.now().toString()
    return id + '-' + this.getRandomInt(0, 99).toString();
  }
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max++ - min) + min);
  }
}
