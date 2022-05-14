import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeersRoutingModule } from './beers-routing.module';
import { BeersComponent } from './beers.component';
import { BeerDescriptorComponent } from './beer-descriptor/beer-descriptor.component';
import { ListCardModule } from '../shared/components';
import {
  BeerDetailsComponent,
  BeerIngredientComponent,
  BeerIngredientsListComponent,
  BeerMashingComponent,
  BeerFermentationComponent,
  BeerTwistComponent
} from './beer-details';
import { BeersListItemComponent, BeersListComponent } from './beers-list';

@NgModule({
  declarations: [
    BeersComponent,
    BeersListComponent,
    BeersListItemComponent,
    BeerDetailsComponent,
    BeerDescriptorComponent,
    BeerIngredientComponent,
    BeerIngredientsListComponent,
    BeerMashingComponent,
    BeerFermentationComponent,
    BeerTwistComponent
  ],
  imports: [
    CommonModule,
    ListCardModule,
    BeersRoutingModule
  ]
})
export class BeersModule { }
