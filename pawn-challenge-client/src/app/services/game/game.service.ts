import { Injectable } from '@angular/core';
import { AuthSettings } from '@angular/fire/auth';
import { StringLike } from '@firebase/util';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject } from 'rxjs';
import { Cell, Chess } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { Timer } from 'src/app/models/timer';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  modSelect = 2
  mods: Map<number, { id: number, des: string, des1: string, img: string }> = new Map()
  enouPlayerOline = false
  ownOfRoom = false

  // 0 offline || 1 with BOT || 2 online
  isGameStart = false
  currentUserIDControll = ''
  time = new Timer()
  //
  timePerTurn = 30
  user = this.authService.user1
  player1: Player
  player2!: Player

  constructor(private authService: AuthService) {
    this.player1 = this.newPlayer(this.user.id, this.user.name, this.user.img, 'VHTMXC', true, false, false)
    this.player2 = this.newPlayer('', '', '', 'VHTMXC', true, false, false)

    this.mods.set(0, {
      id: 0,
      des: 'Call off with friend',
      des1: 'CALL OF',
      img: 'pawn.png'
    })
    this.mods.set(1, {
      id: 1,
      des: 'With BOT',
      des1: 'WITH BOT',
      img: 'knight.png'
    })
    this.mods.set(2, {
      id: 2,
      des: 'Online with new friend',
      des1: 'ONLINE',
      img: 'rook.png'
    })
  }

  getMod(index: number) {
    return this.mods.get(index) ?? {
      id: -1,
      des: '',
      des1: '',
      img: '',
    }
  }

  startGame(player1: Player, player2: Player) {
    this.isGameStart = true;

    player1.chessControl.time.currentTime = 60 * this.timePerTurn
    player2.chessControl.time.currentTime = 60 * this.timePerTurn
    this.time.currentTime = this.timePerTurn
    this.currentUserIDControll = player1.id

    this.time.startCountDown()
    player1.chessControl.time.startCountDown()
  }
  startGameMode2(player1: Player, player2: Player) {
    this.isGameStart = true;
    this.currentUserIDControll = player1.id
  }
  endGame(player1: Player, player2: Player) {
    this.isGameStart = false
    player1.chessControl.time.stop()
    player2.chessControl.time.stop()
    this.time.stop()
    this.time = new Timer()
  }

  canPickChess(userChessControll: string, chessName: string) {
    if (this.isGameStart && this.isAlly(userChessControll, chessName) && userChessControll.includes(chessName)) {
      return true
    }
    return false
  }
  changeCurrentPlayer(player1: Player, player2: Player) {
    if (this.currentUserIDControll == player1.id) {
      this.currentUserIDControll = player2.id
      //p1 => p2
      player1.chessControl.time.pause()
      if (player2.chessControl.time.isStart) {
        player2.chessControl.time.unPause()
      }
      else {
        player2.chessControl.time.startCountDown()
      }
    }
    else if (this.currentUserIDControll == player2.id) {
      this.currentUserIDControll = player1.id
      //p2 => p1
      player2.chessControl.time.pause()
      if (player1.chessControl.time.isStart) {
        player1.chessControl.time.unPause()
      }
      else {
        player1.chessControl.time.startCountDown()
      }
    }
    this.time.currentTime = this.timePerTurn
    console.log('turn for ' + this.currentUserIDControll)
  }
  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2
    return c3.toUpperCase() == c3 || c3.toLocaleLowerCase() == c3
  }
  newPlayer(id: string, name: string, img: string, control: string, isBase: boolean, isBot: boolean, isNewPlayer: boolean) {
    let player: Player = {
      id: id,
      name: name,
      elo: 0,
      img: img,
      isBase: isBase,
      chessControl: {
        chessNameCT: control,
        time: new Timer(),
        chessSDie: [],
        isCheckmat: false,
        isBot: isBot,
        isNewPlayer: isNewPlayer
      }
    }
    return player
  }
  newPlayer1(playerC: Player, control: string, isBase: boolean, isBot: boolean, isNewPlayer: boolean) {
    let player: Player = {
      id: playerC.id,
      name: playerC.name,
      elo: 0,
      img: playerC.img,
      isBase: isBase,
      chessControl: {
        chessNameCT: control,
        time: new Timer(),
        chessSDie: [],
        isCheckmat: false,
        isBot: isBot,
        isNewPlayer: isNewPlayer
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
  getCurrentUser() {
    if (this.enoughPlayer()) {
      if (this.player1.id == this.currentUserIDControll) {
        return this.player1
      }
      return this.player2
    }
    return this.newPlayer('', '', '', '', false, false, false)
  }
}
