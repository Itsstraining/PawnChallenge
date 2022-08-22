import { Injectable } from '@angular/core';
import { Cell, Chess, Position } from '../models/chess.model';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  table: Cell[][] = this.createBoard();
  chessAccess: Map<string, Chess> = new Map<string, Chess>();

  constructor() {
    this.createChessAccess();
    this.setChessToBoard(
      'xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX',

      this.table
    );
    this.printBoard(this.table);
  }

  createBoard() {
    let result: Cell[][] = [];
    for (let i = 0; i < 8; i++) {
      let temp = [];
      for (let j = 0; j < 8; j++) {
        let newCell: Cell = {
          id: '',
          position: { x: j, y: i },
          hasChess: false,
          chess: {
            id: '',
            name: '',
            img: '',
            icon: '',
            firstStep: true,
            position: { x: 0, y: 0 },
          },
        };
        temp.push(newCell);
      }
      result.push(temp);
    }
    this.printBoard(result);
    return result;
  }
  printBoard(board: Cell[][]) {
    let result = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        result += ' ' + board[i][j].chess.name + ' ';
      }
      result += '\n';
    }
    console.log(result);
  }
  //xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX
  setChessToBoard(stringBoard: string, board: Cell[][]) {
    let temp = stringBoard.split('|');
    for (let i = 0; i < 8; i++) {
      let chessName = temp[i].split('');
      for (let j = 0; j < 8; j++) {
        if (chessName[j] !== ' ') {
          board[i][j].hasChess = true;
        }
        board[i][j].chess.id = `${chessName[j]}[${i},${j}]`;
        board[i][j].chess.name = chessName[j];
        let chess = this.chessAccess.get(chessName[j]) ?? {
          id: '',
          name: '',
          img: '',
          icon: '',
          firstStep: '',
          position: { x: 0, y: 0 },
        };
        board[i][j].chess.img = chess.img;
        board[i][j].chess.position = { x: j, y: i };
      }
    }
  }
  newChess() {
    let chess: Chess = {
      id: '',
      name: '',
      img: '',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    };
    return chess;
  }

  onBoard(position: Position) {
    return (
      position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8
    );
  }

  createChessAccess() {
    //black
    this.chessAccess.set('x', {
      id: '',
      name: 'x',
      img: 'blackChess/br.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('h', {
      id: '',
      name: 'h',
      img: 'blackChess/bq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('t', {
      id: '',
      name: 't',
      img: 'blackChess/bb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('v', {
      id: '',
      name: 'v',
      img: 'blackChess/bk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('m', {
      id: '',
      name: 'm',
      img: 'blackChess/bn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('c', {
      id: '',
      name: 'c',
      img: 'blackChess/bp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    //this.chessAccess.set('.', {id: '', name: '.', img: 'green.png', icon: '', position: {x: 0, y: 0}});
    //white
    this.chessAccess.set('X', {
      id: '',
      name: 'X',
      img: 'whiteChess/wr.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('H', {
      id: '',
      name: 'H',
      img: 'whiteChess/wq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('T', {
      id: '',
      name: 'T',
      img: 'whiteChess/wb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('V', {
      id: '',
      name: 'V',
      img: 'whiteChess/wk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('M', {
      id: '',
      name: 'M',
      img: 'whiteChess/wn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
    this.chessAccess.set('C', {
      id: '',
      name: 'C',
      img: 'whiteChess/wp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
    });
  }
}
