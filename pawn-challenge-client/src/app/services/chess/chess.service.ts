import { Injectable } from '@angular/core';
import { faGalacticSenate } from '@fortawesome/free-brands-svg-icons';
import { ReplaySubject } from 'rxjs';
import { Cell, Chess, Position } from 'src/app/models/chess.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from '../game/game.service';
import { ShareService } from '../share/share.service';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  chessAccess: Map<string, Chess> = new Map<string, Chess>();
  table: Cell[][] = []
  chessVector: Map<string, Position> = new Map<string, Position>();
  fromPosition: Position = { x: -1, y: -1 };
  toPosition: Position = { x: -1, y: -1 };
  gameOver: ReplaySubject<{ isDraw: boolean, winer: Player }>

  strBoard = 'xmthvtmx|cccccccc|        |        |        |        |CCCCCCCC|XMTHVTMX'

  constructor(private gameService: GameService, private shareService: ShareService) {
    this.createChessAccess();
    this.createTable(this.table)
    this.setBoardWithString(this.strBoard, this.table, this.gameService.player1)
    this.createVectorMove();
    this.gameOver = new ReplaySubject(3);
  }

  getEffDots(chess: Chess, table: Cell[][]): boolean[][] {
    let dots = []
    for (let i = 0; i < 8; i++) {
      dots.push(Array(8).fill(false))
    }
    let p = chess.position
    let ruleStr = ''
    if (chess.name.toLowerCase() == 'v') {
      ruleStr = '1 up/1 down/1 left/1 right/1 up-left/1 up-right/1 down-left/1 down-right'
      ruleStr += this.setCastlingStr(chess, table)
    }
    else if (chess.name.toLowerCase() == 'x') {
      ruleStr = '* up/* down/* left/* right'
    }
    else if (chess.name.toLowerCase() == 't') {
      ruleStr = '* upleft/* downleft/* upright/* downright'
    }
    else if (chess.name.toLowerCase() == 'h') {
      ruleStr = '* upleft/* downleft/* upright/* downright/* up/* down/* left/* right'
    }
    else if (chess.name.toLowerCase() == 'm') {
      ruleStr = '1 up-up-right/1 up-up-left/1 left-left-up/1 left-left-down/1 down-down-left/1 down-down-right/1 right-right-up/1 right-right-down'
    }
    else if (chess.name.toLowerCase() == 'c') {
      //Pawn
      let base
      chess.isPawnUp ? base = 'up' : base = 'down'
      let baseV, vLeft: Position, vRight: Position
      baseV = this.chessVector.get(base) ?? { x: 0, y: 0 }
      ruleStr = ''
      if (
        chess.firstStep &&
        this.onBoard({ x: chess.position.x + baseV.x, y: chess.position.y + baseV.y }) &&
        !table[chess.position.y + baseV.y][chess.position.x + baseV.x].hasChess &&
        this.onBoard({ x: chess.position.x + 2 * baseV.x, y: chess.position.y + 2 * baseV.y }) &&
        !table[chess.position.y + 2 * baseV.y][chess.position.x + 2 * baseV.x].hasChess
      ) {
        ruleStr = `1 ${base}/1 ${base}-${base}`
      }
      else if (
        this.onBoard({ x: chess.position.x + baseV.x, y: chess.position.y + baseV.y }) &&
        !table[chess.position.y + baseV.y][chess.position.x + baseV.x].hasChess
      ) {
        ruleStr = `1 ${base}`
      }
      vLeft = this.chessVector.get(base + 'left') ?? { x: 0, y: 0 }
      vRight = this.chessVector.get(base + 'right') ?? { x: 0, y: 0 }
      let pLeft: Position = { x: vLeft.x + p.x, y: vLeft.y + p.y }
      let pRight: Position = { x: vRight.x + p.x, y: vRight.y + p.y }
      if (this.onBoard(pLeft) && table[pLeft.y][pLeft.x].hasChess) {
        ruleStr += `/1 ${base}left`
      }
      if (this.onBoard(pRight) && table[pRight.y][pRight.x].hasChess) {
        ruleStr += `/1 ${base}right`
      }

      //---Pawn
    }
    let temp = ruleStr.split('/')
    for (let i = 0; i < temp.length; i++) {
      let [time, grapStr] = temp[i].split(' ')
      if (time == '1') {

        let graps = grapStr.split('-')
        let boxTemp = p
        let grapErr = false

        for (let j = 0; j < graps.length; j++) {
          let move1 = this.chessVector.get(graps[j]) ?? { x: 0, y: 0 }
          if (!this.onBoard({ x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) })) {
            grapErr = true
            break
          }
          boxTemp = { x: (move1.x + boxTemp.x), y: (move1.y + boxTemp.y) }
        }

        if (!grapErr) {
          if (
            !table[boxTemp.y][boxTemp.x].hasChess ||
            (table[boxTemp.y][boxTemp.x].hasChess && !this.isAlly(table[boxTemp.y][boxTemp.x].chess.name, chess.name))
          ) {
            dots[boxTemp.y][boxTemp.x] = true
          }
        }
      }
      else if (time == '*') {
        let pTemp = p
        let move1 = this.chessVector.get(grapStr) ?? { x: 0, y: 0 }
        let isStop = false
        let j = 0
        while (!isStop) {
          pTemp = { x: pTemp.x + move1.x, y: pTemp.y + move1.y }
          if (this.onBoard(pTemp)) {
            if (!table[pTemp.y][pTemp.x].hasChess) {
              dots[pTemp.y][pTemp.x] = true
            }
            else {
              if (!this.isAlly(chess.name, table[pTemp.y][pTemp.x].chess.name)) {
                dots[pTemp.y][pTemp.x] = true
              }
              isStop = true
            }
          } else {
            isStop = true
          }
          j++
          if (j > 20) {
            console.log('lap vo tan')
            break
          }
        }
      }
    }

    // bắt tốt qua đường
    if (chess.name.toLowerCase() == 'c') {
      if (chess.isPawnUp && chess.position.y == 3) {
        if (
          this.fromPosition.y == 1 &&
          this.toPosition.y == 3 &&
          (this.toPosition.x - chess.position.x == -1 || this.toPosition.x - chess.position.x == 1) &&
          table[this.toPosition.y][this.toPosition.x].chess.name.toLowerCase() == 'c' &&
          !this.isAlly(table[this.toPosition.y][this.toPosition.x].chess.name, chess.name)
        ) {
          dots[2][this.toPosition.x] = true
        }
      } else if (!chess.isPawnUp && chess.position.y == 4) {
        if (
          this.fromPosition.y == 6 &&
          this.toPosition.y == 4 &&
          table[this.toPosition.y][this.toPosition.x].chess.name.toLowerCase() == 'c' &&
          !this.isAlly(table[this.toPosition.y][this.toPosition.x].chess.name, chess.name)
        ) {
          dots[5][this.toPosition.x] = true
        }
      }
    }
    return dots
  }
  //nhập thành
  setCastlingStr(chessKing: Chess, table: Cell[][]) {
    if (
      !chessKing.firstStep ||
      chessKing.name.toLowerCase() != 'v' ||
      this.gameService.getCurrentUser().chessControl.isCheckmat
    ) {
      return ''
    }
    let res = ''
    let chessTemp = table[chessKing.position.y][0].chess
    if (
      chessTemp.firstStep && table[chessKing.position.y][0].hasChess &&
      !table[chessKing.position.y][1].hasChess &&
      !table[chessKing.position.y][2].hasChess &&
      !table[chessKing.position.y][3].hasChess
    ) {
      res += '/1 left-left'
    }
    let chessTemp1 = table[chessKing.position.y][7].chess
    if (
      chessTemp1.firstStep && table[chessKing.position.y][7].hasChess &&
      !table[chessKing.position.y][5].hasChess &&
      !table[chessKing.position.y][6].hasChess
    ) {
      res += '/1 right-right'
    }
    return res
  }
  setDotsToTable(dots: boolean[][], table: Cell[][]) {
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j] == true) {
          table[i][j].hasDot = true
        }
      }
    }
  }
  move(chess: Chess, toPosition: Position, table: Cell[][]): boolean {
    let fromP = chess.position
    if (table[toPosition.y][toPosition.x].hasDot) {
      if (table[toPosition.y][toPosition.x].hasDotban) {
        this.shareService.openSnackbar('Lỗi mất Vua', 'OK')
        return false
      }
      table[fromP.y][fromP.x].hasChess = false
      table[fromP.y][fromP.x].chess = this.newChess()

      if (chess.name.toLowerCase() == 'c') {
        if (
          !table[toPosition.y][toPosition.x].hasChess && //không cờ
          toPosition.x != fromP.x //ko di thẳng, đi chéo
        ) {
          let y = 0
          chess.isPawnUp ? y = toPosition.y + 1 : y = toPosition.y - 1
          table[y][toPosition.x].chess = this.newChess()
          table[y][toPosition.x].hasChess = false
        }
      }

      chess.firstStep = false;
      chess.position = toPosition
      table[toPosition.y][toPosition.x].hasChess = true
      table[toPosition.y][toPosition.x].chess = chess

      if (chess.name.toLowerCase() == 'v') {
        if (toPosition.x == 2 && toPosition.y == 0) {
          this.moveNoDot(table[0][0].chess, { x: 3, y: 0 }, table)
        } else if (toPosition.x == 6 && toPosition.y == 0) {
          this.moveNoDot(table[0][7].chess, { x: 5, y: 0 }, table)
        } else if (toPosition.x == 2 && toPosition.y == 7) {
          this.moveNoDot(table[7][0].chess, { x: 3, y: 7 }, table)
        } else if (toPosition.x == 6 && toPosition.y == 7) {
          this.moveNoDot(table[7][7].chess, { x: 5, y: 7 }, table)
        }
      }
      return true
    } else {
      if (toPosition != chess.position) {
        this.shareService.openSnackbar('Invalid move!', 'OK');
      }
      return false
    }
  }
  moveNoDot(chess: Chess, toPosition: Position, table: Cell[][]) {
    let fromP = chess.position
    table[fromP.y][fromP.x].hasChess = false
    table[fromP.y][fromP.x].chess = this.newChess()

    chess.firstStep = false;
    chess.position = toPosition
    table[toPosition.y][toPosition.x].hasChess = true
    table[toPosition.y][toPosition.x].chess = chess
  }
  resetTable(table: Cell[][], player: Player) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j] = this.newCell(i, j)
      }
    }
    this.setBoardWithString(this.strBoard, table, player)
  }
  setBoardWithString(txtTable: string, table: Cell[][], player: Player): Cell[][] {
    try {
      let rows = txtTable.split('|')
      for (let i = 0; i < 8; i++) {
        let chessTxtS = rows[i].split('')
        for (let j = 0; j < 8; j++) {

          if (chessTxtS[j] != ' ') {
            let temp = this.chessAccess.get(chessTxtS[j])
            if (temp != undefined) {
              if (temp.name.toLocaleLowerCase() == 'c') {
                if (this.isAlly(temp.name, player.chessControl.chessNameCT)) {
                  temp.isPawnUp = player.isBase
                }
              }
              let id = table[i][j].id
              table[i][j].chess = { ...temp }
              if (id == '') {
                table[i][j].chess.id = temp.name + i + j
              }
              table[i][j].hasChess = true
              table[i][j].chess.position = table[i][j].position
            }
          }
          if (table[i][j].id == '') {
            table[i][j].id = `[${table[i][j].position.x},${table[i][j].position.y}]`
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    return table
  }
  setChessToBoard1(stringBoard: string) {
    let table: Cell[][] = []
    let temp = stringBoard.split('|');
    for (let i = 0; i < 8; i++) {
      let chessName = temp[i].split('');
      let arr: Cell[] = []
      for (let j = 0; j < 8; j++) {
        let cell = this.newCell(i, j)
        if (chessName[j] != ' ') {
          cell.hasChess = true;
        }
        cell.chess.id = `${chessName[j]}[${i},${j}]`;
        cell.chess.name = chessName[j];
        let chess = this.chessAccess.get(chessName[j]) ?? {
          id: '',
          name: '',
          img: '',
          icon: '',
        };
        cell.chess.img = chess.img;
        cell.chess.position = { x: j, y: i };
        arr.push(cell)
      }
      table.push(arr)
    }
    return table
  }
  //chess => vua
  isCheckmat(chess: Chess, table: Cell[][]) {
    let res = false
    let dots = this.getEffDots(chess, table)
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j] && table[i][j].chess.name.toLowerCase() == 'v') {
          res = true
        }
      }
    }
    return res
  }
  isCheckmatAll(chessEnemy: Chess, table: Cell[][]): boolean {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        if (this.isAlly(chessEnemy.name, table[i][j].chess.name)) {
          if (this.isCheckmat(table[i][j].chess, table)) {
            return true
          }
        }
      }
    }
    return false
  }
  getDotban(chess1: Chess, table: Cell[][], dots: boolean[][]): boolean[][] {
    let chess = { ...chess1 }
    let tableCopy: Cell[][] = []
    table.forEach((e) => {
      let arr: Cell[] = []
      e.forEach(cell => {
        arr.push({ ...cell })
      })
      tableCopy.push(arr)
    })
    let dotsban: boolean[][] = []
    for (let i = 0; i < 8; i++) {
      dotsban.push(Array(8).fill(false))
    }
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        if (dots[i][j]) {
          let cell = { ...tableCopy[i][j] }
          this.moveNoDot(chess, { x: j, y: i }, tableCopy)
          let breakForiijj = false
          for (let ii = 0; ii < tableCopy.length; ii++) {
            if (breakForiijj) break
            for (let jj = 0; jj < tableCopy[ii].length; jj++) {
              if (breakForiijj) break
              if (
                tableCopy[ii][jj].hasChess &&
                !this.isAlly(chess.name, tableCopy[ii][jj].chess.name) &&
                this.isCheckmat(tableCopy[ii][jj].chess, tableCopy)) {
                dotsban[i][j] = true
                breakForiijj = true
              }
            }
          }
          this.moveNoDot(chess, chess1.position, tableCopy)
          tableCopy[i][j].hasChess = cell.hasChess
          if (cell.hasChess) {
            tableCopy[i][j].chess = cell.chess
          }
        }
      }
    }

    if (chess1.name.toLowerCase() == 'v') {
      if (dotsban[0][3]) dotsban[0][2] = true
      else if (dotsban[0][5]) dotsban[0][6] = true
      else if (dotsban[7][3]) dotsban[7][2] = true
      else if (dotsban[7][5]) dotsban[7][6] = true
    }

    return dotsban
  }
  setDotsbanToTable(dotsban: boolean[][], table: Cell[][]) {
    for (let i = 0; i < dotsban.length; i++) {
      for (let j = 0; j < dotsban[i].length; j++) {
        if (dotsban[i][j] == true) {
          table[i][j].hasDotban = true
        }
      }
    }
  }
  //phong cờ
  toCapture(pawn: Chess, toChessName: string, table: Cell[][]) {
    let chess = this.chessAccess.get(toChessName)
    if (chess != undefined) {
      chess.firstStep = false
      chess.id = pawn.id
      chess.position = pawn.position
      table[pawn.position.y][pawn.position.x].chess = { ...chess }
    }
  }
  setDrawOrWin(table: Cell[][], currentPlayer: Player) {
    let breakFor = false
    let noTurn = true
    for (let i = 0; i < table.length; i++) {
      if (breakFor) break
      for (let j = 0; j < table[i].length; j++) {
        if (breakFor) break
        if (table[i][j].hasChess && this.isAlly(currentPlayer.chessControl.chessNameCT, table[i][j].chess.name)) {
          let dots = this.getEffDots(table[i][j].chess, table)
          let dotsban = this.getDotban(table[i][j].chess, table, dots)
          for (let ii = 0; ii < dots.length; ii++) {
            if (breakFor) break
            for (let jj = 0; jj < dots[ii].length; jj++) {
              if (breakFor) break
              if (dots[ii][jj] && !dotsban[ii][jj]) {
                noTurn = false
                breakFor = true
              }
            }
          }
        }
      }
    }
    if (noTurn) {
      if (currentPlayer.chessControl.isCheckmat) {
        console.log('het co')
        this.gameOver.next({
          isDraw: false,
          winer: currentPlayer
        })
      } else if (!currentPlayer.chessControl.isCheckmat) {
        this.gameOver.next({
          isDraw: true,
          winer: currentPlayer
        })
      }
    }
  }

  ///////////////////////
  createVectorMove() {
    this.chessVector.set('left', { x: -1, y: 0 });
    this.chessVector.set('right', { x: 1, y: 0 });
    this.chessVector.set('up', { x: 0, y: -1 });
    this.chessVector.set('down', { x: 0, y: 1 });

    this.chessVector.set('upleft', { x: -1, y: -1 });
    this.chessVector.set('upright', { x: 1, y: -1 });
    this.chessVector.set('downleft', { x: -1, y: 1 });
    this.chessVector.set('downright', { x: 1, y: 1 });
  }
  printBoard(board: Cell[][]) {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += ' ---- ---- ---- ---- ---- ---- ---- ---- \n| '
      for (let j = 0; j < 8; j++) {
        if (board[i][j].chess.name == '') {
          result += ' ';
        }
        else {
          result += board[i][j].chess.name;
        }
        if (board[i][j].hasDotban) {
          result += 'x | ';
        }
        else if (board[i][j].hasDot) {
          result += '. | ';
        } else {
          result += '  | ';
        }
      }
      result += '\n';
    }
    result += ' ---- ---- ---- ---- ---- ---- ---- ---- \n'
    console.log(result);
  }
  newCell(i: number, j: number) {
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
      hasDot: false,
      hasDotban: false,
    };
    return newCell;
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
  clearDot() {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].length; j++) {
        this.table[i][j].hasDot = false
        this.table[i][j].hasDotban = false
      }
    }
  }
  createTable(table: Cell[][]) {
    for (let i = 0; i < 8; i++) {
      let arr: Cell[] = []
      for (let j = 0; j < 8; j++) {
        arr.push(this.newCell(i, j))
      }
      table.push(arr)
    }
  }
  createChessAccess() {
    //black
    this.chessAccess.set('x', {
      id: '',
      name: 'x',
      img: 'br.png',
      icon: 'fi-sr-chess-rook',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('h', {
      id: '',
      name: 'h',
      img: 'bq.png',
      icon: 'fi-sr-chess-queen',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('t', {
      id: '',
      name: 't',
      img: 'bb.png',
      icon: 'fi-sr-chess-bishop',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('v', {
      id: '',
      name: 'v',
      img: 'bk.png',
      icon: 'fi-sr-chess-king',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('m', {
      id: '',
      name: 'm',
      img: 'bn.png',
      icon: 'fi-sr-chess-knight',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('c', {
      id: '',
      name: 'c',
      img: 'bp.png',
      icon: 'fi-sr-chess-pawn',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    //this.chessAccess.set('.', {id: '', name: '.', img: 'green.png', icon: '', position: {x: 0, y: 0}});
    //white
    this.chessAccess.set('X', {
      id: '',
      name: 'X',
      img: 'wr.png',
      icon: 'fi-rr-chess-rook',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('H', {
      id: '',
      name: 'H',
      img: 'wq.png',
      icon: 'fi-rr-chess-queen',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('T', {
      id: '',
      name: 'T',
      img: 'wb.png',
      icon: 'fi-rr-chess-bishop',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('V', {
      id: '',
      name: 'V',
      img: 'wk.png',
      icon: 'fi-rr-chess-king',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('M', {
      id: '',
      name: 'M',
      img: 'wn.png',
      icon: 'fi-rr-chess-knight',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
    this.chessAccess.set('C', {
      id: '',
      name: 'C',
      img: 'wp.png',
      icon: 'fi-br-chess-pawn',
      firstStep: true,
      position: { x: 0, y: 0 },
      isPawnUp: false
    });
  }

}
