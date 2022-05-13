import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app-routes';

const routes: Routes = [
  {
    path: appRoutes.beersModule,
    loadChildren: () => import('./beers/beers.module').then(module => module.BeersModule)
  },
  {
    path: '',
    redirectTo: appRoutes.beersModule,
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
