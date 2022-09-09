import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cell } from 'src/app/models/chess.model';
import { ChessSkinService } from 'src/app/services/chess-skin/chess-skin.service';
import { ChessService } from 'src/app/services/chess/chess.service';

@Component({
  selector: 'app-dialog-skin',
  templateUrl: './dialog-skin.component.html',
  styleUrls: ['./dialog-skin.component.scss']
},)
export class DialogSkinComponent1 implements OnInit {
  table: Cell[][];

  indexPiece = 26;
  indexBoard = 10;
  constructor(
    private chessService: ChessService,
    public dialogRef: MatDialogRef<DialogSkinComponent1>,
    public skinService:ChessSkinService
    ) {
    this.indexPiece= parseInt(localStorage.getItem('indexPiece')??'26')
    this.indexBoard = parseInt(localStorage.getItem('indexBoard')??'10')
    this.table =this.chessService.setChessToBoard1('xmthvtmx|cccccccc|        |        |        |        |        |        ')

  }
  showPlaySound: boolean = false;

  ngOnInit(): void {
  }
  tooglePlaySound() {
    this.showPlaySound = !this.showPlaySound;
  }

  save(){
    console.log(this.skinService.currenSkinChess)
    localStorage.setItem('indexPiece',this.indexPiece.toString())
    localStorage.setItem('indexBoard',this.indexBoard.toString())
    this.skinService.currenSkinChess = this.skinService.Pieces[this.indexPiece].folderName
    this.skinService.currenSkinTable = this.skinService.Board[this.indexBoard].folderName
    console.log(this.skinService.currenSkinChess)

    this.dialogRef.close()
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
