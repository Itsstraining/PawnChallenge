import { HistoryMoveService } from 'src/app/services/history/history-move.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { DialogSkinComponent } from '../dialog-skin/dialog-skin.component'

@Component({
  selector: 'app-graps',
  templateUrl: './graps.component.html',
  styleUrls: ['./graps.component.scss']
})
export class GrapsComponent implements OnInit {
  constructor(public dialog: MatDialog,public hs:HistoryMoveService,public playerService: PlayerService, public gameService: GameService) {

  }

  ngOnInit(): void {
  }

  openDialogSkin() {
    const dialogRef = this.dialog.open(DialogSkinComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
