import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogTestRoutingModule } from './dialog-test-routing.module';
import { DialogTestComponent } from './dialog-test.component';


@NgModule({
  declarations: [
    DialogTestComponent
  ],
  imports: [
    CommonModule,
    DialogTestRoutingModule
  ]
})
export class DialogTestModule { }
