import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cell } from 'src/app/models/chess.model';
import { ChessService } from 'src/app/services/chess/chess.service';

@Component({
  selector: 'app-dialog-skin',
  templateUrl: './dialog-skin.component.html',
  styleUrls: ['./dialog-skin.component.scss']
},)
export class DialogSkinComponent implements OnInit {
  table: Cell[][];
  Pieces: any[];
  Board: any[];
  indexPiece = 26;
  indexBoard = 10;
  constructor(
    private chessService: ChessService,
    public dialogRef: MatDialogRef<DialogSkinComponent>) {
    this.indexPiece= parseInt(localStorage.getItem('indexPiece')??'26')
    this.indexBoard = parseInt(localStorage.getItem('indexBoard')??'10')
    this.table = this.chessService.createBoard()
    this.chessService.setChessToBoard1('XMTHVTMX|CCCCCCCC|        |        |        |        |        |        ', this.table)
    this.Pieces = [
      {
        name: '3D-ChessKid',
        folderName: '3D-ChessKid',
        isSelect: false
      },
      {
        name: '3D-Plastic',
        folderName: '3D-Plastic',
        isSelect: false
      },
      {
        name: '3D-Staunton',
        folderName: '3D-Staunton',
        isSelect: false
      },
      {
        name: '3D-Wood',
        folderName: '3D-Wood',
        isSelect: false
      },
      {
        name: '8-bit',
        folderName: '8-bit',
        isSelect: false
      },
      {
        name: 'Alpha',
        folderName: 'Alpha',
        isSelect: false
      },
      {
        name: 'Bases',
        folderName: 'Bases',
        isSelect: false
      },
      {
        name: 'Book',
        folderName: 'Book',
        isSelect: false
      },
      {
        name: 'Bubblegum',
        folderName: 'Bubblegum',
        isSelect: false
      },
      {
        name: 'Cases',
        folderName: 'Cases',
        isSelect: false
      },
      {
        name: 'Classic',
        folderName: 'Classic',
        isSelect: false
      },
      {
        name: 'Club',
        folderName: 'Club',
        isSelect: false
      },
      {
        name: 'Condal',
        folderName: 'Condal',
        isSelect: false
      },
      {
        name: 'Dash',
        folderName: 'Dash',
        isSelect: false
      },
      {
        name: 'Game Room',
        folderName: 'Game Room',
        isSelect: false
      },
      {
        name: 'Glass',
        folderName: 'Glass',
        isSelect: false
      },
      {
        name: 'Gothic',
        folderName: 'Gothic',
        isSelect: false
      },
      {
        name: 'Graffiti',
        folderName: 'Graffiti',
        isSelect: false
      },
      {
        name: 'Icy Sea',
        folderName: 'Icy Sea',
        isSelect: false
      },
      {
        name: 'Light',
        folderName: 'Light',
        isSelect: false
      },
      {
        name: 'Lolz',
        folderName: 'Lolz',
        isSelect: false
      },
      {
        name: 'Marble',
        folderName: 'Marble',
        isSelect: false
      },
      {
        name: 'Maya',
        folderName: 'Maya',
        isSelect: false
      },
      {
        name: 'Metal',
        folderName: 'Metal',
        isSelect: false
      },
      {
        name: 'Modern',
        folderName: 'Modern',
        isSelect: false
      },
      {
        name: 'Nature',
        folderName: 'Nature',
        isSelect: false
      },
      {
        name: 'Neo',
        folderName: 'Neo',
        isSelect: false
      },
      {
        name: 'Neon',
        folderName: 'Neon',
        isSelect: false
      },
      {
        name: 'Neo-Wood',
        folderName: 'Neo-Wood',
        isSelect: false
      },
      {
        name: 'Newspaper',
        folderName: 'Newspaper',
        isSelect: false
      },
      {
        name: 'Ocean',
        folderName: 'Ocean',
        isSelect: false
      },
      {
        name: 'Real 3D',
        folderName: 'Real 3D',
        isSelect: false
      },
      {
        name: 'Sky',
        folderName: 'Sky',
        isSelect: false
      },
      {
        name: 'Space',
        folderName: 'Space',
        isSelect: false
      },
      {
        name: 'Tigers',
        folderName: 'Tigers',
        isSelect: false
      },
      {
        name: 'Tournament',
        folderName: 'Tournament',
        isSelect: false
      },
      {
        name: 'Vintage',
        folderName: 'Vintage',
        isSelect: false
      },
      {
        name: 'Wood',
        folderName: 'Wood',
        isSelect: false
      },

    ]
    this.Board = [
      {
        name:'8-bit',
        folderName: '8-bit',
        isSelect: false
      },
      {
        name:'Bases',
        folderName: 'Bases',
        isSelect: false
      },
      {
        name:'Blue',
        folderName: 'Blue',
        isSelect: false
      },
      {
        name:'Brown',
        folderName: 'Brown',
        isSelect: false
      },
      {
        name:'Bubblegum',
        folderName: 'Bubblegum',
        isSelect: false
      },
      {
        name:'Burled Wood',
        folderName: 'BurledWood',
        isSelect: false
      },
      {
        name:'Dark Wood',
        folderName: 'DarkWood',
        isSelect: false
      },
      {
        name:'Dash',
        folderName: 'Dash',
        isSelect: false
      },
      {
        name:'Glass',
        folderName: 'Glass',
        isSelect: false
      },
      {
        name:'Graffiti',
        folderName: 'Graffiti',
        isSelect: false
      },
      {
        name:'Green',
        folderName: 'Green',
        isSelect: false
      },
      {
        name:'Icy Sea',
        folderName: 'IcySea',
        isSelect: false
      },
      {
        name:'Light',
        folderName: 'Light',
        isSelect: false
      },
      {
        name:'Lolz',
        folderName: 'Lolz',
        isSelect: false
      },
      {
        name:'Marble',
        folderName: 'Marble',
        isSelect: false
      },
      {
        name:'Metal',
        folderName: 'Metal',
        isSelect: false
      },
      {
        name:'Neon',
        folderName: 'Neon',
        isSelect: false
      },
      {
        name:'Newspaper',
        folderName: 'Newspaper',
        isSelect: false
      },
      {
        name:'Orange',
        folderName: 'Orange',
        isSelect: false
      },
      {
        name:'Overlay',
        folderName: 'Overlay',
        isSelect: false
      },
      {
        name:'Parchment',
        folderName: 'Parchment',
        isSelect: false
      },
      {
        name:'Purple',
        folderName: 'Purple',
        isSelect: false
      },
      {
        name:'Red',
        folderName: 'Red',
        isSelect: false
      },
      {
        name:'Sand',
        folderName: 'Sand',
        isSelect: false
      },
      {
        name:'Sky',
        folderName: 'Sky',
        isSelect: false
      },
      {
        name:'Stone',
        folderName: 'Stone',
        isSelect: false
      },
      {
        name:'Tan',
        folderName: 'Tan',
        isSelect: false
      },
      {
        name:'Tournament',
        folderName: 'Tournament',
        isSelect: false
      },
      {
        name:'Translucent',
        folderName: 'Translucent',
        isSelect: false
      },
      {
        name:'Walnut',
        folderName: 'Walnut',
        isSelect: false
      },
    ]
  }
  showPlaySound: boolean = false;

  ngOnInit(): void {
  }
  tooglePlaySound() {
    this.showPlaySound = !this.showPlaySound;
  }

  changeIndexBorad(){
    console.log(this.indexBoard);
  }

  save(){
    localStorage.setItem('indexPiece',this.indexPiece.toString())
    localStorage.setItem('indexBoard',this.indexBoard.toString())
    this.dialogRef.close()
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
