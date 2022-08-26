import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chessBoard', loadChildren: () => import('./pages/chess-board/chess-board.module').then(m => m.ChessBoardModule) }, 
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./pages/home-pages/home-pages.module').then(m => m.HomePagesModule) },
  { path: 'login', loadChildren: () => import('./pages/home/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
