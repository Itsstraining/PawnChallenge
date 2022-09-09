import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-dialog-draw',
  templateUrl: './dialog-draw.component.html',
  styleUrls: ['./dialog-draw.component.scss']
})
export class DialogDrawComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDrawComponent>, public gameS:GameService) {

  }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
