import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChessSkinService {
  currenSkinChess = ''
  currenSkinTable = ''
  Pieces!: any[];
  Board!: any[];
  indexPiece = 0
  indexBoard = 0
  constructor() {
    this.create()
    this.indexPiece= parseInt(localStorage.getItem('indexPiece')??'26')
    this.indexBoard = parseInt(localStorage.getItem('indexBoard')??'10')
    this.currenSkinChess = this.Pieces[this.indexPiece].folderName
    this.currenSkinTable = this.Board[this.indexBoard].folderName

  }
  create(){
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
        name: 'GameRoom',
        folderName: 'Game-Room',
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
        folderName: 'Icy-Sea',
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
        folderName: 'Real-3D',
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
}
