import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Timer } from 'src/app/models/timer';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player1: Player
  player2: Player


  constructor() {
    this.player1 = this.newPlayer('user1', 'VHTMXC', true)
    this.player2 = this.newPlayer('user2', 'vhtmxc', false)
  }

  newPlayer(id: string, control: string, isBase: boolean) {
    let player: Player = {
      id: id,
      name: '',
      elo: 0,
      img: '',
      isBase: isBase,
      chessControl: {
        chessID: control,
        currentSecond: new Timer(),
        canMoveChess: false,
        chessSDie: []
      }
    }
    return player
  }
  enoughPlayer() {
    if (this.player1.id == '') {
      return false
    }
    if (this.player2.id == '') {
      return false
    }
    return true
  }
  getUserById(id: string) {
    if (this.enoughPlayer()) {
      if (this.player1.id == id) {
        return this.player1
      }
      return this.player2
    }
    return this.newPlayer('', '', false)
  }
}
