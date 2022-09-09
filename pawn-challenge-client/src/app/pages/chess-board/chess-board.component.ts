import { Cell, Chess, Position } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';
import { ChessService } from 'src/app/services/chess/chess.service';
import { GameService } from 'src/app/services/game/game.service';
import { HistoryService } from 'src/app/services/history/history-move.service';
import { Grap } from 'src/app/models/grap.model';
import { ChessSkinService } from 'src/app/services/chess-skin/chess-skin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogWinComponent } from './components/dialog/dialog-win/dialog-win.component';
import { DialogDrawComponent } from './components/dialog/dialog-draw/dialog-draw.component';
import { SocketService } from 'src/app/services/socket/socket.service';
import { DialogGameModComponent } from './components/dialog/dialogGamemode/dialog.component';
import { Player } from 'src/app/models/player.model';
import { ShareService } from 'src/app/services/share/share.service';
import { DialogToCaptureComponent } from './components/dialog/dialog-to-capture/dialog-to-capture.component';
import { DialogLoseComponent } from './components/dialog/dialog-lose/dialog-lose.component';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  providers: [

  ]
})
export class ChessBoardComponent implements OnInit {
  chess: Chess;
  table: Cell[][] = this.chessService.table
  grap: Grap;
  catchPawn = false

  constructor(
    public chessService: ChessService,
    public gameService: GameService,
    public skinChess: ChessSkinService,
    private historyMoveService: HistoryService,
    public dialog: MatDialog,
    private shareService: ShareService

  ) {
    this.grap = this.historyMoveService.newGrap();
    this.chess = chessService.newChess()
  }

  //Cầm 1 con cờ
  // mousedownImg(chess: Chess, ev: any) {
  //   if (!this.gameService.isGameStart) { this.shareService.openSnackbar("Just click START", 'OK'); return }
  //   if (this.gameService.getCurrentUser().chessControl.isBot) return
  //   if (this.gameService.getCurrentUser().chessControl.isNewPlayer) return
  //   this.chessService.clearDot();
  //   if (ev.which != 1) {
  //     return;
  //   }

  //   this.chess = chess;
  //   if (this.gameService.canPickChess(this.getCurrentUser().chessControl.chessNameCT, chess.name)) {
  //     this.grap = this.historyMoveService.newGrap();
  //     this.chess = chess;
  //     let dots = this.chessService.getEffDots(chess, this.table)
  //     this.chessService.setDotsToTable(dots, this.table);
  //     let dotsban = this.chessService.getDotban(chess, this.table, dots)
  //     this.chessService.setDotsbanToTable(dotsban, this.table)
  //   }
  // }

  //Thả 1 con cờ
  drop(ev: any, toPostion: Position) {
    if (!this.gameService.isGameStart) return
    if (this.gameService.getCurrentUser().chessControl.isBot) return
    if (this.gameService.getCurrentUser().chessControl.isNewPlayer) return
    ev.preventDefault();
    let fromP = this.chess.position;
    let ismove = this.chessService.move(this.chess, toPostion, this.table);
    if (ismove) {
      this.getCurrentUser().chessControl.isCheckmat = false
      this.grap = this.historyMoveService.newGrap();
      this.backgroundTurn(fromP, toPostion);
      this.addGrapToHistoryService(fromP, toPostion)

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

      this.chessService.setDrawOrWin(this.table, this.gameService.getCurrentUser())
    }
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
      // this.historyMoveService.sendDataMove(this.grap);
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

  // startGame() {
  //   this.gameService.startGame();
  // }

  backgroundTurn(fromP: Position, toP: Position) {
    this.chessService.fromPosition = fromP;
    this.chessService.toPosition = toP;
  }

  addGrapToHistoryService(from: Position, to: Position) {
    this.grap.grapTo = this.historyMoveService.toFormatPosition(to);
    this.grap.grapFrom = this.historyMoveService.toFormatPosition(from);
    this.grap.nameChess = this.chess.name;
    this.grap.icon = this.chess.icon
    this.grap.uid = this.getCurrentUser().id;
    this.grap.id = Date.now().toString();
    this.historyMoveService.addGrap(this.grap);
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

    this.gameService.time.$timeOut.subscribe((isTimeOut) => {
      this.getCurrentUser().chessControl.time.isTimeOut = true
      console.log(this.getCurrentUser())
      this.gameService.endGame(this.gameService.player1, this.gameService.player2)
      if (isTimeOut == true) {
        if (this.gameService.player2.chessControl.time.isTimeOut) {
          this.openDialogWin()
        } else {
          this.openDialogLose()
        }
      }
    });

    this.chessService.gameOver.subscribe(e => {
      this.gameService.endGame(this.gameService.player1, this.gameService.player2)
      if (e.isDraw) {
        this.dialog.open(DialogDrawComponent, {
          panelClass: 'dialogDraw',
          width: '42em',
        });
      } else {
        if (this.gameService.player2.chessControl.isCheckmat) {
          this.openDialogWin()
        } else {
          this.openDialogLose()
        }
      }
    })
  }
  openDialogLose() {
    this.dialog.open(DialogLoseComponent, {
      panelClass: 'dialogDraw',
      width: '42em',
    });
  }
  openDialogWin() {
    this.dialog.open(DialogWinComponent, {
      panelClass: 'dialogDraw',
      width: '42em',
    });
  }

  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  allowDrop(ev: Event) {
    ev.preventDefault();
  }
}
