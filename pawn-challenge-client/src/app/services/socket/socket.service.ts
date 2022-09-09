import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketID = ''
  roomID = ''
  ffishID = ''

  constructor(private socket: Socket, private auth: Auth) {
    this.connectServer()
  }

  connectServer() {
    let user = { id: this.randomID(), name: '' }
    if (this.auth.currentUser != null) {
      user.id = this.auth.currentUser.uid
      user.name = this.auth.currentUser.displayName ?? ''
    }
    let data = { user: user }
    this.socket.emit('connectServer', data)
    this.socket.fromEvent<any>('onConnected').subscribe((e) => {
      this.socketID = e
      console.log(`my socket: [${e}]`)
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
