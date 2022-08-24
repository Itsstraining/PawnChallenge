import { Injectable } from '@angular/core';
import { Cell, Chess, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  kingB!:Chess
  kingW!:Chess
  table: Cell[][] = this.createBoard();

  chessAccess: Map<string, Chess> = new Map<string, Chess>();



  constructor(private playService: PlayerService) {
    this.createChessAccess();
    this.setChessToBoard(
      'xmtvhtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTVHTMX',
      this.table,
      this.playService.player1
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
            isPawnUp: false,
          },
        };
        temp.push(newCell);
      }
      result.push(temp);
    }
    // this.printBoard(result);
    return result;
  }
  printBoard(board: Cell[][]) {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += '-- --- --- --- --- --- --- --- \n'
      for (let j = 0; j < 8; j++) {
        if( board[i][j].chess.name == ''){
          result += '  | ';
        }
        else{
          result += board[i][j].chess.name + ' | ';
        }
      }
      result += '\n';
    }
    result += '-- --- --- --- --- --- --- --- \n'
    console.log(result);
  }
  //xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX
  setChessToBoard(txtTable: string, chessTable: Cell[][], player: Player): Cell[][] {
    let res = [...chessTable]
    try {
      let rows = txtTable.split('|')
      for (let i = 0; i < 8; i++) {
        let chessTxtS = rows[i].split('')
        for (let j = 0; j < 8; j++) {
          if (chessTxtS[j] != ' ') {
            let temp = this.chessAccess.get(chessTxtS[j])
            if (temp != undefined) {

              if (temp.name.toLocaleLowerCase() == 'c') {
                if (this.isAlly(temp.name, player.chessControl.chessID)) {
                  temp.isPawnUp = player.isBase
                }
              }

              let id = res[i][j].chess.id
              res[i][j].chess = { ...temp }
              if (id == '') {
                res[i][j].chess.id = temp.name + i + j
              }
              res[i][j].hasChess = true
              res[i][j].chess.position = res[i][j].position

              if(temp.name == 'v'){
                this.kingB = res[i][j].chess
              }
              else if(temp.name == 'V'){
                this.kingW = res[i][j].chess
              }
            }
          }

          if (res[i][j].id == '') {
            res[i][j].id = `[${res[i][j].position.x},${res[i][j].position.y}]`
          }
        }

      }
    } catch (error) {
      console.log(error)
    }
    return res
  }

  newChess() {
    let chess: Chess = {
      id: '',
      name: '',
      img: '',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    };
    return chess;
  }

  onBoard(position: Position) {
    return (
      position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8
    );
  }

  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2;
    return c3.toUpperCase() == c3 || c3.toLowerCase() == c3;
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
      isPawnUp: false
    });
    this.chessAccess.set('h', {
      id: '',
      name: 'h',
      img: 'blackChess/bq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('t', {
      id: '',
      name: 't',
      img: 'blackChess/bb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('v', {
      id: '',
      name: 'v',
      img: 'blackChess/bk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('m', {
      id: '',
      name: 'm',
      img: 'blackChess/bn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('c', {
      id: '',
      name: 'c',
      img: 'blackChess/bp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
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
      isPawnUp: false
    });
    this.chessAccess.set('H', {
      id: '',
      name: 'H',
      img: 'whiteChess/wq.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('T', {
      id: '',
      name: 'T',
      img: 'whiteChess/wb.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('V', {
      id: '',
      name: 'V',
      img: 'whiteChess/wk.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('M', {
      id: '',
      name: 'M',
      img: 'whiteChess/wn.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('C', {
      id: '',
      name: 'C',
      img: 'whiteChess/wp.png',
      icon: '',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
  }
}
