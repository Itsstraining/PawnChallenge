import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  $onMessage = this.socket.fromEvent<any>('onMessage');
  constructor(private socket: Socket, private auth: Auth,) {
    this.$onMessage.subscribe(e => {
      console.log(e)
    })

    this.connectSocketServer()
  }
  connectSocketServer() {
    let user = { id: '', userName: '' }
    if (this.auth.currentUser != null) {
      user.id = this.auth.currentUser.uid ?? this.getRandomId()
      user.userName = this.auth.currentUser.displayName ?? ''
    } else {
      user.id = this.getRandomId()
      user.userName = ''
    }
    let data = { socketIO: 'kljasdasashdas', user: { id: 'asdasd', name: 'asdasdas' } }
    this.socket.emit('connectServer', data)
  }
  createRoom() {

  }
  joinRoom() {

  }
  startGame2Player() {

  }
  startGameWithBot() {

  }
  moveChess() {

  }
  str = 'abcdefghijklmnopqrstuvwxyz'
  getRandomId(): string {
    let random = Math.floor(Math.random() * (this.str.length - 0 + 1) + 0); // The maximum is inclusive and the minimum is inclusive
    return Date.now().toString() + this.str[random]
  }
}
