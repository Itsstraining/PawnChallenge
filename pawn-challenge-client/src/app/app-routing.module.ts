import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chessBoard',
    loadChildren: () =>
      import('./pages/chess-board/chess-board.module').then(
        (m) => m.ChessBoardModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dialog-test',
    loadChildren: () =>
      import('./pages/dialog-test/dialog-test.module').then(
        (m) => m.DialogTestModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
