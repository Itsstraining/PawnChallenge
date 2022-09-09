import { Injectable } from '@angular/core';
import { Position } from 'src/app/models/chess.model';
import { Grap } from 'src/app/models/grap.model';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  grapPositionX: Map<number, string> = new Map();
  grapPositionY: Map<number, string> = new Map();

  grapPositionH: Map<string, number> = new Map();
  grapPositionW: Map<string, number> = new Map();
  graps: Grap[] = [];

  grapsHalf: Grap[] = [];

  constructor(private gameSerivce: GameService) {
    this.createGrapPosition()
  }
  createGrapPosition() {
    //x
    this.grapPositionX.set(0, 'a')
    this.grapPositionX.set(1, 'b')
    this.grapPositionX.set(2, 'c')
    this.grapPositionX.set(3, 'd')
    this.grapPositionX.set(4, 'e')
    this.grapPositionX.set(5, 'f')
    this.grapPositionX.set(6, 'g')
    this.grapPositionX.set(7, 'h')
    //y
    this.grapPositionY.set(0, '8')
    this.grapPositionY.set(1, '7')
    this.grapPositionY.set(2, '6')
    this.grapPositionY.set(3, '5')
    this.grapPositionY.set(4, '4')
    this.grapPositionY.set(5, '3')
    this.grapPositionY.set(6, '2')
    this.grapPositionY.set(7, '1')
    //

    //h
    this.grapPositionW.set('a', 0)
    this.grapPositionW.set('b', 1)
    this.grapPositionW.set('c', 2)
    this.grapPositionW.set('d', 3)
    this.grapPositionW.set('e', 4)
    this.grapPositionW.set('f', 5)
    this.grapPositionW.set('g', 6)
    this.grapPositionW.set('h', 7)
    //w
    this.grapPositionH.set('8', 0)
    this.grapPositionH.set('7', 1)
    this.grapPositionH.set('6', 2)
    this.grapPositionH.set('5', 3)
    this.grapPositionH.set('4', 4)
    this.grapPositionH.set('3', 5)
    this.grapPositionH.set('2', 6)
    this.grapPositionH.set('1', 7)
  }
  addGrap(grap: Grap) {
    this.graps.push(grap);
    if (grap.uid == this.gameSerivce.player1.id) {
      this.grapsHalf.push(grap);
    }
  }
  newGrap() {
    let grap: Grap = {
      id: '',
      grapFrom: '',
      grapTo: '',
      nameChess: '',
      uid: '',
      icon: ''
    }
    return grap;
  }
  toFormatPosition(position: Position): string {
    let x = this.grapPositionX.get(position.x);
    let y = this.grapPositionY.get(position.y);
    if (x != undefined && y != undefined) {
      return (x + y);
    }
    return '';
  }
  grapStrToPosition(str: string): { fromP: Position, toPosition: Position } {
    let fromP: Position = { x: -1, y: -1 }
    let toP: Position = { x: -1, y: -1 }
    let temp = 0
    for (let i = 0; i < str.length; i++) {
      if (i != 0 && 'abcdefghi'.includes(str[i])) {
        temp = i
      }
    }
    fromP.x = this.grapPositionW.get(str[0]) ?? -1
    toP.x = this.grapPositionW.get(str[temp]) ?? -1
    fromP.y = this.grapPositionH.get(str.slice(1, temp)) ?? -1
    toP.y = this.grapPositionH.get(str.slice(temp + 1, str.length)) ?? -1

    return { fromP: fromP, toPosition: toP }
  }
}

