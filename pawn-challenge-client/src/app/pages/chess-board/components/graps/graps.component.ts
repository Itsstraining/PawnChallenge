import { HistoryMoveService } from 'src/app/services/history/history-move.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { PlayerService } from 'src/app/services/player/player.service';
@Component({
  selector: 'app-graps',
  templateUrl: './graps.component.html',
  styleUrls: ['./graps.component.scss']
})
export class GrapsComponent implements OnInit {

  constructor(public hs:HistoryMoveService,public playerService: PlayerService, public gameService: GameService) {

  }

  ngOnInit(): void {
  }

}
