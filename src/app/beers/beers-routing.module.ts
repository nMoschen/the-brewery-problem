import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeersListComponent } from './beers-list/beers-list.component';
import { beersRoutes } from './beers-routes';
import { BeersComponent } from './beers.component';

const routes: Routes = [
  {
    path: '',
    component: BeersComponent,
    children: [
      {
        path: beersRoutes.list,
        component: BeersListComponent
      },
      {
        path: beersRoutes.details,
        component: BeerDetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeersRoutingModule { }
