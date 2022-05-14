import { Component, Input, OnInit } from '@angular/core';
import { BeerIngredient } from 'src/app/beers/models';

@Component({
  selector: 'fresco-beer-ingredient',
  templateUrl: './beer-ingredient.component.html',
  styleUrls: ['./beer-ingredient.component.scss']
})
export class BeerIngredientComponent implements OnInit {

  @Input() ingredient!: BeerIngredient;

  constructor() { }

  ngOnInit(): void {
  }

}
