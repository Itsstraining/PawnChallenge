import { Cell, Chess } from './../../models/chess.model';
import { Component, OnInit } from '@angular/core';

import { ChessService } from 'src/app/services/chess.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
})
export class ChessBoardComponent implements OnInit {
  board: Cell[][];

  constructor(private chessService: ChessService,) {
    //this.chessService.createBoard();
    this.board = this.chessService.table
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }


  ngOnInit(): void {}
}
