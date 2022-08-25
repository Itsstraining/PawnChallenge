import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChessBoardRoutingModule } from './chess-board-routing.module';
import { ChessBoardComponent } from './chess-board.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight, faChess, faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { GrapsComponent } from './components/graps/graps.component';
@NgModule({
  declarations: [
<<<<<<< HEAD
    // ChessBoardComponent,
  
=======
    ChessBoardComponent,
    GrapsComponent
>>>>>>> 6142c0d906ed660d610263ffeeda716b0422f31a
  ],
  imports: [
    CommonModule,
    ChessBoardRoutingModule,
    MatCardModule,
    ScrollingModule,
    FontAwesomeModule
  ]
})
export class ChessBoardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faChess,
      faChessKing,
      faChessBishop,
      faChessPawn,
      faChessKnight,
      faChessQueen,
      faChessRook,
      faCaretRight
    );
  }
 }
