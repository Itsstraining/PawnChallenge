import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChessBoardRoutingModule } from './chess-board-routing.module';
import { ChessBoardComponent } from './chess-board.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight, faChess, faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { GrapsComponent } from './components/graps/graps.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { DialogWinComponent } from './components/dialog/dialog-win/dialog-win.component';
import { DialogDrawComponent } from './components/dialog/dialog-draw/dialog-draw.component';
import { DialogLoseComponent } from './components/dialog/dialog-lose/dialog-lose.component';
import { DialogGameModComponent } from './components/dialog/dialogGamemode/dialog.component';
import { DialogSkinComponent } from './components/dialog/dialog-skin/dialog-skin.component';
import { DialogToCaptureComponent } from './components/dialog/dialog-to-capture/dialog-to-capture.component';
@NgModule({
  declarations: [
    ChessBoardComponent,
    GrapsComponent,
    DialogSkinComponent,
    DialogToCaptureComponent,
    DialogWinComponent,
    DialogDrawComponent,
    DialogLoseComponent,
    DialogGameModComponent
  ],
  imports: [
    CommonModule,
    ChessBoardRoutingModule,
    MatCardModule,
    ScrollingModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule,
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
