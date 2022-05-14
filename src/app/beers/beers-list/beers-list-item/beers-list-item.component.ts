import { Component, Input } from '@angular/core';
import { Beer } from '../../models';

@Component({
  selector: 'fresco-beers-list-item',
  templateUrl: './beers-list-item.component.html',
  styleUrls: ['./beers-list-item.component.scss']
})
export class BeersListItemComponent {

  @Input() beer!: Beer;

}
