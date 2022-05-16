import { Component, Input } from '@angular/core';
import { BeerIngredient } from '../../models';

@Component({
  selector: 'fresco-beer-ingredients-list',
  templateUrl: './beer-ingredients-list.component.html',
  styleUrls: ['./beer-ingredients-list.component.scss']
})
export class BeerIngredientsListComponent {
  @Input() ingredients!: BeerIngredient[];
  @Input() ingredientTypeName!: string;
}
