import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule { }
