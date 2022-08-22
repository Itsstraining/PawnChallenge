import { PieceMoveService } from './../../services/piece-move.service';
import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';

import { ChessService } from 'src/app/services/chess.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
})
export class ChessBoardComponent implements OnInit {
  board: Cell[][];
  dots: Cell[][];
  chess: Chess;
  graps = [
    [{
      id: '1',
      numGrap: '1',
      grapFrom: 'G2',
      grapTo: 'E7',
      nameChess: 'm',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '2',
      grapFrom: 'F6',
      grapTo: 'A1',
      nameChess: 'h',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '4',
      grapFrom: 'F7',
      grapTo: 'C1',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '5',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'h',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '6',
      grapFrom: 'A8',
      grapTo: 'B6',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'h',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '1',
      grapFrom: 'G2',
      grapTo: 'E7',
      nameChess: 'c',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '2',
      grapFrom: 'F6',
      grapTo: 'A1',
      nameChess: 'v',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 'm',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '4',
      grapFrom: 'F7',
      grapTo: 'C2',
      nameChess: 'c',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '5',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'x',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '6',
      grapFrom: 'A8',
      grapTo: 'B6',
      nameChess: 'm',
      selected: false,
      icon: '',
    },],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],[{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'c',
      selected: false,
      icon: '',
    }, {
      id: '1',
      numGrap: '8',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'm',
      selected: false,
      icon: '',
    }],
    [{
      id: '1',
      numGrap: '7',
      grapFrom: 'C7',
      grapTo: 'E5',
      nameChess: 'x',
      selected: true,
      icon: '',
    }],
  ]
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
    this.dots= this.chessService.createBoard();
    this.chess = chess;
    if (ev.which != 1) {
      return;
    }
    this.pieceService.setTableDots(chess, this.dots, this.board);
  }


  ngOnInit(): void {}
}
