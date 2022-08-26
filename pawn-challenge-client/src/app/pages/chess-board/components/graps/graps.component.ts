import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game/game.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { DialogSkinComponent } from '../dialog-skin/dialog-skin.component'

@Component({
  selector: 'app-graps',
  templateUrl: './graps.component.html',
  styleUrls: ['./graps.component.scss']
})
export class GrapsComponent implements OnInit {
  half = 0
  graps1 = [
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '5',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G8',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '9',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G9',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '10',
      numGrap: '3',
      grapFrom: 'A6',
      grapTo: 'G10',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },{
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },{
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },{
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },{
      id: '1',
      numGrap: '3',
      grapFrom: 'Aa',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
    {
      id: '1',
      numGrap: '3',
      grapFrom: 'Ab',
      grapTo: 'G1',
      nameChess: 't',
      selected: false,
      icon: '',
    },
  ]
  grapsHalf: any[] = []
  constructor(public playerService: PlayerService, public gameService: GameService, public dialog: MatDialog) {
    this.half = Math.ceil(this.graps1.length / 2)
    this.grapsHalf = this.graps1.slice(0, this.half)
  }

  ngOnInit(): void {
  }

  openDialogSkin() {
    const dialogRef = this.dialog.open(DialogSkinComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
