import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/chess.model';
import { ChessService } from 'src/app/services/chess/chess.service';

@Component({
  selector: 'app-dialog-skin',
  templateUrl: './dialog-skin.component.html',
  styleUrls: ['./dialog-skin.component.scss']
})
export class DialogSkinComponent implements OnInit {
table: Cell[][]
  constructor(private chessService:ChessService) {
    this.table = this.chessService.createBoard()
    this.chessService.setChessToBoard1('XMTHVTMX|CCCCCCCC|        |        |        |        |        |        ',this.table)
  }
  showPlaySound: boolean = false;
  
  ngOnInit(): void {
  }
  tooglePlaySound() {
    this.showPlaySound = !this.showPlaySound;
  }
}
