import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  indexSelect = 0
  arr = [
    {
      title: "Call off with friend",
      img: "../../../assets/ImageGamemode-Win-Lose/pawn.png"
    },
    {
      title: "With BOT",
      img: "../../../assets/ImageGamemode-Win-Lose/knight.png"
    },
    {
      title: "Online with new friend",
      img: "../../../assets/ImageGamemode-Win-Lose/rook.png"
    },
  ]
  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  changeIndexSelect(i: number) {
    this.indexSelect = i
  }

  play() {
    let str = ''
    this.indexSelect == 0 ? str = 'call-off'
      : this.indexSelect == 1 ? str = 'with-BOT'
        : this.indexSelect == 2 ? str = 'online'
          : str = ''
    this.dialogRef.close(str)
  }
}
