import { Injectable } from '@angular/core';
import { Cell, Chess, Position } from '../models/chess.model';
import { ChessService } from './chess.service';

@Injectable({
  providedIn: 'root',
})
export class PieceMoveService {
  dots: Cell[][];
  chessVector: Map<string, Position> = new Map<string, Position>();
  constructor(private chessService: ChessService) {
    this.dots = this.chessService.createBoard();
    this.createVectorMove();
  }
  setTableDots(chess: Chess, dots: Cell[][], board: Cell[][]) {
    let ruleStr = '';
    console.log(chess);
    if (chess.name.toLowerCase() == 'v') {
      ruleStr =
        '1 up/1 down/1 left/1 right/1 leftup/1 rightup/1 leftdown/1 rightdown';
    } else if (chess.name.toLowerCase() == 'm') {
      ruleStr =
        '1 up-up-right/1 up-up-left/1 down-down-right/1 down-down-left/1 left-left-up/1 left-left-down/1 right-right-up/1 right-right-down';
    } else if (chess.name.toLowerCase() == 'x') {
      ruleStr = '* up/* down/* left/* right';
    } else if (chess.name.toLowerCase() == 't') {
      ruleStr = '* leftup/* rightup/* leftdown/* rightdown';
    } else if (chess.name.toLowerCase() == 'h') {
      ruleStr = '* up/* down/* left/* right/* leftup/* rightup/* leftdown/* rightdown';
    }else if(chess.name.toLowerCase() == 'c'){
      ruleStr = '1 up-up';
    }
    let rules = ruleStr.split('/');
    for (let i = 0; i < rules.length; i++) {
      let [time, moves] = rules[i].split(' ');

      if (time == '1') {
        let grapStr = moves.split('-');
        let newVector = { x: chess.position.x, y: chess.position.y };
        let error = false;
        for (let j = 0; j < grapStr.length; j++) {
          let vectorOne = this.chessVector.get(grapStr[j]) ?? { x: 0, y: 0 };
          newVector = {
            x: newVector.x + vectorOne.x,
            y: newVector.y + vectorOne.y,
          };
          if (this.chessService.onBoard(newVector) == false) {
            error = true;
            break;
          }
        }
        if (!error) {
          if (
            board[newVector.y][newVector.x].hasChess == false ||
            (board[newVector.y][newVector.x].hasChess == true &&
              this.isAlly(
                chess.name,
                board[newVector.y][newVector.x].chess.name
              ) == false)
          )
            dots[newVector.y][newVector.x].chess.name = '.';
        }
      } else if (time == '*') {
        let move1 = this.chessVector.get(moves) ?? { x: 0, y: 0 };
        let isStop = false;
        let tempPosition = chess.position;
        let j = 0;
        while (!isStop) {
          tempPosition = {
            x: tempPosition.x + move1.x,
            y: tempPosition.y + move1.y,
          };
          if (this.chessService.onBoard(tempPosition) == true) {
            if (board[tempPosition.y][tempPosition.x].hasChess == false) {
              dots[tempPosition.y][tempPosition.x].chess.name = '.';
            } else {
              if (
                !this.isAlly(
                  chess.name,
                  board[tempPosition.y][tempPosition.x].chess.name
                )
              ) {
                dots[tempPosition.y][tempPosition.x].chess.name = '.';
                //isStop = true;
              }
              isStop = true;
            }
          } else {
            isStop = true;
          }

          j++;
          if (j > 20) {
            break;
          }
        }
      }

      // let vector = this.chessVector.get(rule)??{x: 0, y: 0};
      // //let newVector = {x: chess.position.x + vector.x, y: chess.position.y + vector.y};
      // if(this.chessService.onBoard(newVector)){
      //   dots[chess.position.y + vector.y][chess.position.x + vector.x].chess.name = '.';
      // }
    }
    //this.chessService.printBoard(dots);
  }

  moveKing(chess: Chess, dots: Cell[][]) {
    let ruleStr = 'up/down/left/right/leftup/rightup/leftdown/rightdown';
    let rules = ruleStr.split('/');
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let vector = this.chessVector.get(rule) ?? { x: 0, y: 0 };
      let newVector = {
        x: chess.position.x + vector.x,
        y: chess.position.y + vector.y,
      };
      if (this.chessService.onBoard(newVector)) {
        dots[chess.position.y + vector.y][
          chess.position.x + vector.x
        ].chess.name = '.';
      }
    }
    this.chessService.printBoard(dots);
  }

  isAlly(c1: string, c2: string) {
    let c3 = c1 + c2;
    return c3.toUpperCase() == c3 || c3.toLowerCase() == c3;
  }

  moveChess(
    chess: Chess,
    toPostion: Position,
    dots: Cell[][],
    board: Cell[][]
  ): boolean {
    let fromPositon = chess.position;
    if (
      board[toPostion.y][toPostion.x].hasChess == false &&
      dots[toPostion.y][toPostion.x].chess.name == '.'
    ) {
      board[fromPositon.y][fromPositon.x].hasChess = false;
      board[fromPositon.y][fromPositon.x].chess = this.chessService.newChess();

      chess.position = toPostion;
      board[toPostion.y][toPostion.x].hasChess = true;
      board[toPostion.y][toPostion.x].chess = chess;
      return true;
    }
    return false;
  }

  createVectorMove() {
    this.chessVector.set('left', { x: -1, y: 0 });
    this.chessVector.set('right', { x: 1, y: 0 });
    this.chessVector.set('up', { x: 0, y: -1 });
    this.chessVector.set('down', { x: 0, y: 1 });

    this.chessVector.set('leftup', { x: -1, y: -1 });
    this.chessVector.set('rightup', { x: 1, y: -1 });
    this.chessVector.set('leftdown', { x: -1, y: 1 });
    this.chessVector.set('rightdown', { x: 1, y: 1 });
  }
}
