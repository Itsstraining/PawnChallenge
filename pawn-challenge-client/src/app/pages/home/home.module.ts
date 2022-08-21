import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PlayChessComponent } from './components/play-chess/play-chess.component';
import { BattleWithComputerComponent } from './components/battle-with-computer/battle-with-computer.component';
import { LearnChessComponent } from './components/learn-chess/learn-chess.component';
import { HomePageComponent } from './components/home-page/home-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    PlayChessComponent,
    BattleWithComputerComponent,
    LearnChessComponent,
    LearnChessComponent,
    HomePageComponent,
    HomePageComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
