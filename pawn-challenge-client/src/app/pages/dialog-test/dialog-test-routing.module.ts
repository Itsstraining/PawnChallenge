import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogTestComponent } from './dialog-test.component';

const routes: Routes = [{ path: '', component: DialogTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogTestRoutingModule { }
