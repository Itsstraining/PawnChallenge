import { Injectable } from '@angular/core';
import { Chess } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { Timer } from 'src/app/models/timer';
import { ChessService } from '../chess/chess.service';
import { PieceMoveService } from '../piece/piece-move.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  isGameStart = false
  currentUserIDControll = ''
  time = new Timer()
  //
  timePerTurn = 30

  constructor(private chessService: ChessService, private pieceService: PieceMoveService) {
  }

  startGame(player1: Player, player2: Player) {
    this.isGameStart = true;

    player1.chessControl.time.currentTime = 60 * 15
    player2.chessControl.time.currentTime = 60 * 15
    this.time.currentTime = this.timePerTurn
    this.currentUserIDControll = player1.id

    this.time.startCountDown()
    player1.chessControl.time.startCountDown()
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
    else {
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
  }

  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2
    return c3.toUpperCase() == c3 || c3.toLocaleLowerCase() == c3
  }

  isCheckmat(chess: Chess) {
    let res = false
    let dots = this.pieceService.getEffDots(chess)
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j] && this.chessService.table[i][j].chess.name.toLowerCase() == 'v') {
          res = true
        }
      }
    }
    return res
  }
}
