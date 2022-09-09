import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';
import { ShareService } from 'src/app/services/share/share.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogGameModComponent implements OnInit {
  userName1 = '';
  userName2 = '';
  friendID = '';
  index = -1
  constructor(
    private dialogRef: MatDialogRef<DialogGameModComponent>,
    public socketService: SocketService,
    public shareService: ShareService,
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }
  changeIndexSelect(i: number) {
    this.index = i
  }

  play() {
    if(this.index == -1) return
    this.gameService.modSelect = this.index
    if (this.userName1 == '') this.userName1 = 'Player 1'
    if (this.userName2 == '') this.userName2 = 'Player 2'
    this.dialogRef.close({ mess: this.gameService.getMod(this.gameService.modSelect), mod: this.gameService.modSelect, name1: this.userName1, name2: this.userName2 })
  }

  clickCopy() {
    this.shareService.openSnackbar('copied', '✔️')
  }

}
