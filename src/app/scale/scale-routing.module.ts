import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaleComponent } from './scale.component';
import { ScaleGuard } from './scale.guard';

const routes: Routes = [
  {
    path: '',
    component: ScaleComponent,
    canActivate: [ScaleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaleRoutingModule { }
