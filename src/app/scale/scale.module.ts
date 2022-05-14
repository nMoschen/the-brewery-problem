import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScaleRoutingModule } from './scale-routing.module';
import { ScaleComponent } from './scale.component';


@NgModule({
  declarations: [
    ScaleComponent
  ],
  imports: [
    CommonModule,
    ScaleRoutingModule
  ]
})
export class ScaleModule { }
