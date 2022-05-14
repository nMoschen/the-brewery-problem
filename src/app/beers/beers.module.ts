import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeersRoutingModule } from './beers-routing.module';
import { BeersComponent } from './beers.component';
import { BeersListComponent } from './beers-list/beers-list.component';
import { BeersListItemComponent } from './beers-list/beers-list-item/beers-list-item.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeerDescriptorComponent } from './shared/beer-descriptor/beer-descriptor.component';
import { ListCardModule } from '../shared/components';


@NgModule({
  declarations: [
    BeersComponent,
    BeersListComponent,
    BeersListItemComponent,
    BeerDetailsComponent,
    BeerDescriptorComponent
  ],
  imports: [
    CommonModule,
    ListCardModule,
    BeersRoutingModule
  ]
})
export class BeersModule { }
