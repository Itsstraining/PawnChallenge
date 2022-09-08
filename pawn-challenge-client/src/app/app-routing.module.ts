import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chessBoard', loadChildren: () => import('./pages/chess-board/chess-board.module').then(m => m.ChessBoardModule) }, 
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./pages/home-pages/home-pages.module').then(m => m.HomePagesModule) },
  { path: 'login', loadChildren: () => import('./pages/home/login/login.module').then(m => m.LoginModule) },

  { path: 'learn-chesss', loadChildren: () => import('./pages/home/learn-chess/learn-chesss.module').then(m => m.LearnChesssModule) },
  { path: 'dialog-test', loadChildren: () => import('./pages/dialog-test/dialog-test.module').then(m => m.DialogTestModule) },
  { path: 'rule', loadChildren: () => import('./pages/rule/rule.module').then(m => m.RuleModule) },
  { path: 'register', loadChildren: () => import('./pages/home/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
