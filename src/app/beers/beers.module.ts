import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeersRoutingModule } from './beers-routing.module';
import { BeersComponent } from './beers.component';
import { BeersListComponent } from './beers-list/beers-list.component';
import { BeersListItemComponent } from './beers-list/beers-list-item/beers-list-item.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeerDescriptorComponent } from './beer-descriptor/beer-descriptor.component';
import { ListCardModule } from '../shared/components';
import { BeerIngredientComponent } from './beer-ingredients-list/beer-ingredient/beer-ingredient.component';
import { BeerIngredientsListComponent } from './beer-ingredients-list/beer-ingredients-list.component';
import { BeerMashingComponent } from './beer-mashing/beer-mashing.component';
import { BeerFermentationComponent } from './beer-fermentation/beer-fermentation.component';


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
    BeerFermentationComponent
  ],
  imports: [
    CommonModule,
    ListCardModule,
    BeersRoutingModule
  ]
})
export class BeersModule { }
