import { Timer } from './../../models/timer';
import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';
import { PieceMoveService } from 'src/app/services/piece/piece-move.service';
import { ChessService } from 'src/app/services/chess/chess.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { GameService } from 'src/app/services/game/game.service';
import { Player } from 'src/app/models/player.model';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
})
export class ChessBoardComponent implements OnInit {
  board: Cell[][];
  dots: Cell[][];
  chess: Chess;
  currentPlayer: Player
  time=10;
  photo= 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp';

  constructor(
    private pieceService: PieceMoveService,
    private chessService: ChessService,
    public playerService: PlayerService,
    public gameService: GameService
  ) {
    //this.chessService.createBoard();
    this.currentPlayer = this.playerService.getUserById(this.gameService.currentUserIDControll)
    this.dots = this.chessService.createBoard();
    this.chess = this.chessService.newChess();
    this.chessService.table = this.chessService.createBoard();
    let strBoard = 'xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX'
    this.chessService.table = this.chessService.setChessToBoard(strBoard,chessService.table, playerService.player1)
    this.board = chessService.table
  }


  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any, chess: Chess) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev: any, toPostion: Position) {
    ev.preventDefault();
    let ismove = this.pieceService.move(
      this.chess,
      toPostion,
      this.board,
      this.dots,
      this.playerService.player1
    );
    if (ismove) {
      var data = ev.dataTransfer.getData('text');
      ev.target.appendChild(document.getElementById(data));
      this.gameService.changeCurrentPlayer(this.playerService.player1, this.playerService.player2)
    } else {
      console.log('not move');
    }
    this.dots = this.chessService.createBoard();
  }

  dragend(ev: any) {
    if (ev.which != 1) {
      return;
    }
  }

  mousedownImg(chess: Chess, ev: any) {
    this.dots = this.chessService.createBoard();
    if (ev.which != 1) {
      return;
    }
    this.currentPlayer = this.playerService.getUserById(this.gameService.currentUserIDControll)
    if (this.gameService.canPickChess(this.currentPlayer.chessControl.chessID, chess.name)) {
      this.chess = chess
      this.dots=this.pieceService.setTableDots(chess, this.board, this.dots);
    }
  }

  startGame() {
    this.gameService.startGame(this.playerService.player1, this.playerService.player2)
  }

  ngOnInit(): void { }
}
