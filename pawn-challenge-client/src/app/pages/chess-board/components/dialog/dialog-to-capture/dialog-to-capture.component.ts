import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chess } from 'src/app/models/chess.model';
import { ChessSkinService } from 'src/app/services/chess-skin/chess-skin.service';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-dialog-to-capture',
  templateUrl: './dialog-to-capture.component.html',
  styleUrls: ['./dialog-to-capture.component.scss']
})
export class DialogToCaptureComponent implements OnInit {
  namePng = ''
  constructor(
    public skinChess: ChessSkinService,
    public dialogRef: MatDialogRef<DialogToCaptureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pawn: Chess },
  ) {
    if (data.pawn.isPawnUp) {
      this.namePng = 'w'
    } else {
      this.namePng = 'b'
    }
    console.log(this.namePng)
  }

  ngOnInit(): void {
  }

  closeWithValue(nameChess: string) {
    if (this.data.pawn.isPawnUp) {
      this.dialogRef.close(nameChess.toUpperCase())
    } else {
      this.dialogRef.close(nameChess.toLowerCase())
    }
  }

}
