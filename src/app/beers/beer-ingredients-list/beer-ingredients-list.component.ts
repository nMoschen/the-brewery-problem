import { Component, Input, OnInit } from '@angular/core';
import { BeerIngredient } from '../models';

@Component({
  selector: 'fresco-beer-ingredients-list',
  templateUrl: './beer-ingredients-list.component.html',
  styleUrls: ['./beer-ingredients-list.component.scss']
})
export class BeerIngredientsListComponent implements OnInit {

  @Input() ingredients!: BeerIngredient[];
  @Input() ingredientTypeName!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
