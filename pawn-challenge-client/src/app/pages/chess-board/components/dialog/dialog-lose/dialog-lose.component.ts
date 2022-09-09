import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';
@Component({
  selector: 'app-dialog-lose',
  templateUrl: './dialog-lose.component.html',
  styleUrls: ['./dialog-lose.component.scss']
})
export class DialogLoseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLoseComponent>, public gameS: GameService) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
