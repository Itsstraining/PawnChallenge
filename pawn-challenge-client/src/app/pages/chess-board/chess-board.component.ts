import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';
import { ChessService } from 'src/app/services/chess/chess.service';
import { GameService } from 'src/app/services/game/game.service';
import { HistoryMoveService } from 'src/app/services/history/history-move.service';
import { Grap } from 'src/app/models/grap.model';
import { ChessSkinService } from 'src/app/services/chess-skin/chess-skin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogToCaptureComponent } from './components/dialog-to-capture/dialog-to-capture.component'
import { DialogWinComponent } from './components/dialog/dialog-win/dialog-win.component';
import { DialogDrawComponent } from './components/dialog/dialog-draw/dialog-draw.component';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  providers: [

  ]
})
export class ChessBoardComponent implements OnInit {
  chess!: Chess;
  table: Cell[][] = this.chessService.table
  grap: Grap;
  catchPawn = false

  constructor(
    public chessService: ChessService,
    public gameService: GameService,
    public skinChess: ChessSkinService,
    private historyMoveService: HistoryMoveService,
    public dialog: MatDialog,
    private socketService: SocketService,

  ) {
    this.grap = this.historyMoveService.newGrap();
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any, chess: Chess) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  //Thả 1 con cờ
  drop(ev: any, toPostion: Position) {
    ev.preventDefault();
    let fromP = this.chess.position;
    let ismove = this.chessService.move(this.chess, toPostion, this.table);
    // di chuyển
    if (ismove) {
      this.getCurrentUser().chessControl.isCheckmat = false
      // lưu nước đi
      this.addGrap(toPostion)
      // lưu màu nước đi
      this.backgroundTurn(fromP, toPostion);
<<<<<<< HEAD
      // di chuyển lỗi
      this.connectSocket(fromP, toPostion);
    }
=======
      if (this.chess.name.toLowerCase() == 'c' && (this.chess.position.y == 0 || this.chess.position.y == 7)) {
        this.openDialogToCapture(this.chess)
      }
      else {
        this.gameService.changeCurrentPlayer(this.gameService.player1, this.gameService.player2);
        let isCheckmat = this.chessService.isCheckmatAll(this.chess, this.table)
        if (isCheckmat) {
          this.getCurrentUser().chessControl.isCheckmat = true
        }
      }
>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8

      this.chessService.setDrawOrWin(this.table, this.gameService.getCurrentUser())
    }
    //xoá dots gợi ý
    this.chessService.clearDot();
  }

  dragend(ev: any) {
    if (ev.which != 1) {
      return;
    }
  }

  //Cầm 1 con cờ
  mousedownImg(chess: Chess, ev: any) {
    this.chessService.clearDot();
    if (ev.which != 1) {
      return;
    }
    this.chess = chess;
    if (
      this.gameService.canPickChess(this.getCurrentUser().chessControl.chessNameCT, chess.name)
    ) {
      this.grap = this.historyMoveService.newGrap();
      this.chess = chess;
      let dots = this.chessService.getEffDots(chess, this.table)
      this.chessService.setDotsToTable(dots, this.table);
      let dotsban = this.chessService.getDotban(chess, this.table, dots)
      this.chessService.setDotsbanToTable(dotsban, this.table)

      this.historyMoveService.createGrapPosition();
      this.grap.grapFrom = this.historyMoveService.toFormatPosition(chess.position);
<<<<<<< HEAD
=======
      this.historyMoveService.sendDataMove(this.grap);
>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8
    }
  }

  isCheckmat(nameChess: string) {
    let user = this.getCurrentUser()
    if (user.chessControl.isCheckmat && this.chessService.isAlly(user.chessControl.chessNameCT, nameChess)) {
      return true
    }
    return false
  }



  getCurrentUser() {
    return this.gameService.getCurrentUser()
  }

  connectSocket(formP: Position, toP: Position) {
    this.historyMoveService.sendDataMove(formP, toP);
  }
  startGame() {
    // let strBoard = '    v  x|        |        |        |        |        |        |XMTHVTMX'
    // this.chessService.table = this.chessService.setChessToBoard(strBoard, this.gameService.player1)
    this.gameService.startGame();
  }

  backgroundTurn(fromP: Position, toP: Position) {
    this.chessService.fromPosition = fromP;
    this.chessService.toPosition = toP;
  }

  addGrap(toPostion: Position) {
    this.grap.grapTo = this.historyMoveService.toFormatPosition(toPostion);
    this.grap.nameChess = this.chess.name;
    this.grap.uid = this.getCurrentUser().id;
    this.grap.id = Date.now().toString();
    this.historyMoveService.addGrap(this.grap);
    this.historyMoveService.formatPosition(this.grap);
  }

  openDialogToCapture(pawn: Chess) {
    const dialogRef = this.dialog.open(DialogToCaptureComponent, {
      width: 'auto',
      height: 'auto',
      data: { pawn: pawn },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(chessName => {
      this.chessService.toCapture(pawn, chessName, this.table)
      this.gameService.changeCurrentPlayer(this.gameService.player1, this.gameService.player2);
      this.chess = this.table[pawn.position.y][pawn.position.x].chess
      let isCheckmat = this.chessService.isCheckmat(this.chess, this.table)
      if (isCheckmat) {
        this.getCurrentUser().chessControl.isCheckmat = true
      }
    });
  }

  ngOnInit(): void {
    this.gameService.time.isTimeOut.subscribe((isTimeOut) => {
      // this.gameService.endGame()
      if (isTimeOut == true) {
        const dialogRef = this.dialog.open(DialogWinComponent, {
          panelClass: 'dialogWin',
          width: '42em',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    });
    this.chessService.gameOver.subscribe(e => {
      this.gameService.endGame()
      if (e.isDraw) {
        const dialogRef = this.dialog.open(DialogDrawComponent, {
          panelClass: 'dialogDraw',
          width: '42em',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      } else {
        const dialogRef = this.dialog.open(DialogWinComponent, {
          panelClass: 'dialogWin',
          width: '42em',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    })
  }
}
