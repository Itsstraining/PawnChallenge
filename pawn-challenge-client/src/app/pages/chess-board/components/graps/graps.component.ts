import { HistoryService } from 'src/app/services/history/history-move.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';
import { DialogGameModComponent } from '../dialog/dialogGamemode/dialog.component';
import { ChessService } from 'src/app/services/chess/chess.service';
import { ShareService } from 'src/app/services/share/share.service';
import { DialogSkinComponent1 } from '../dialog-skin/dialog-skin.component';

@Component({
  selector: 'app-graps',
  templateUrl: './graps.component.html',
  styleUrls: ['./graps.component.scss']
})
export class GrapsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public hService: HistoryService,
    public playerService: GameService,
    public gameService: GameService,
    private chessS: ChessService,
    private shareService: ShareService
  ) {
  }

  ngOnInit(): void {
  }

  getModDes() {
    let str = this.gameService.getMod(this.gameService.modSelect).des1
    if (str == '') return 'Mod need to chosse..'
    return str
  }

  openDialogSkin() {
    const dialogRef = this.dialog.open(DialogSkinComponent1, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  clickStart() {
    if (this.gameService.modSelect == 0 || this.gameService.modSelect == 1 || this.gameService.modSelect == 2) {

      let ran1 = this.shareService.getRandomIntAndIgno(1, 19, 20)
      this.gameService.player1 = this.gameService.newPlayer(
        '', '',
        'a' + this.shareService.getRandomIntAndIgno(1, 19, ran1).toString(),
        'VHTMXC', true, false, false
      )
      this.chessS.resetTable(this.chessS.table, this.gameService.player1)
      this.hService.graps.length = 0
      this.hService.grapsHalf.length = 0

      if (this.gameService.modSelect == 0) {
        this.gameService.player2 = this.gameService.newPlayer(
          '', '',
          'a' + ran1.toString(), 'vhtmxc',
          false, false, false
        )
        this.gameService.startGame(
          this.gameService.player1,
          this.gameService.player2,
        )
      } else if (this.gameService.modSelect == 1) {

      }
    }
  }

  openDialogNewGame() {
    const dialogRef = this.dialog.open(DialogGameModComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((e: { mess: string, mod: number, name1: string, name2: string }) => {

    });
  }



}
