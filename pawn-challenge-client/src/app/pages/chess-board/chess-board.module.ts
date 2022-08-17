import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChessBoardRoutingModule } from './chess-board-routing.module';
import { ChessBoardComponent } from './chess-board.component';


@NgModule({
  declarations: [
    ChessBoardComponent
  ],
  imports: [
    CommonModule,
    ChessBoardRoutingModule
  ]
})
export class ChessBoardModule { }
