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
    this.player1 = this.newPlayer('user1', 'Vinh123', 'a13', 'VHTMXC', true)
    this.player2 = this.newPlayer('user2', 'Phat123', 'a5', 'vhtmxc', false)
  }

  newPlayer(id: string, name: string, img: string, control: string, isBase: boolean) {
    let player: Player = {
      id: id,
      name: name,
      elo: 0,
      img: img,
      isBase: isBase,
      chessControl: {
        chessID: control,
        time: new Timer(),
        chessSDie: [],
        isCheckmat: false,
        chessCheckmat: {
          id: '',
          name: '',
          img: '',
          icon: '',
          firstStep: true,
          position: { x: 0, y: 0 },
          isPawnUp: false
        }
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
    return this.newPlayer('', '', '', '', false)
  }
}
