import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app-routes';

const routes: Routes = [
  {
    path: appRoutes.beersModule,
    loadChildren: () => import('./beers/beers.module').then(module => module.BeersModule)
  },
  {
    path: appRoutes.scaleModule,
    loadChildren: () => import('./scale/scale.module').then(module => module.ScaleModule)
  },
  {
    path: '',
    redirectTo: appRoutes.beersModule,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: appRoutes.beersModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
