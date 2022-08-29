import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleRoutingModule } from './rule-routing.module';
import { RuleComponent } from './rule.component';


@NgModule({
  declarations: [
    RuleComponent
  ],
  imports: [
    CommonModule,
    RuleRoutingModule
  ]
})
export class RuleModule { }
