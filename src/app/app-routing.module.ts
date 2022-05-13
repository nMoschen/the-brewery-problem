import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app-routes';

const routes: Routes = [
  {
    path: appRoutes.beersModule,
    loadChildren: () => import('./beers/beers-routing.module').then(module => module.BeersRoutingModule)
  },
  {
    path: '',
    redirectTo: appRoutes.beersModule,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
