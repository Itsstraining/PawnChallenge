import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayChesssComponent } from './play-chesss.component';

const routes: Routes = [{ path: '', component: PlayChesssComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayChesssRoutingModule { }
