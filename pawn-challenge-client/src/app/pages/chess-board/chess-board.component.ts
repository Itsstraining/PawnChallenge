import { PieceMoveService } from './../../services/piece-move.service';
import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';

import { ChessService } from 'src/app/services/chess.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
})
export class ChessBoardComponent implements OnInit {
  board: Cell[][];
  dots: Cell[][];
  chess: Chess;
  constructor(
    private pieceService: PieceMoveService,
    private chessService: ChessService
  ) {
    //this.chessService.createBoard();
    this.board = this.chessService.table;
    this.dots = this.pieceService.dots;
    this.chess = this.chessService.newChess();

  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any, chess: Chess) {
    ev.dataTransfer.setData('text', ev.target.id);
    console.log(chess);
  }

  drop(ev: any, toPostion: Position) {
    let ismove = this.pieceService.moveChess(
      this.chess,
      toPostion,
      this.dots,
      this.board
    );
    if (ismove) {
      var data = ev.dataTransfer.getData('text');
      ev.target.appendChild(document.getElementById(data));

    }else{
      console.log('not move');
    }
    this.dots = this.chessService.createBoard();
    //this.dots = this.chessService.createBoard();
    //console.log(this.chessService.printBoard(this.board));
    ev.preventDefault();
  }

  dragend(ev: any) {
    if (ev.which != 1) {
      return;
    }
  }

  mousedownImg(chess: Chess, ev: any) {
    //console.log('mousedown');
    this.dots= this.chessService.createBoard();
    this.chess = chess;
    if (ev.which != 1) {
      return;
    }
    //this.pieceService.moveKing(this.chess, this.dots);
    this.pieceService.setTableDots(chess, this.dots, this.board);
    // if (chess.name == 'c') this.pieceService.moveBlackPawn(chess);
    // else if (chess.name == 'C') this.pieceService.moveWhitePawn(chess);
    // else if (chess.name == 'm') this.pieceService.moveBlackKnight(chess);
  }


  ngOnInit(): void {}
}
