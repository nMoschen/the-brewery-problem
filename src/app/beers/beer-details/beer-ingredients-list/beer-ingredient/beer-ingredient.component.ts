import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { appRoutes } from 'src/app/app-routes';
import { BeerIngredient } from 'src/app/beers/models';
import { BeerDetailsService } from '../../beer-details.service';

@Component({
  selector: 'fresco-beer-ingredient',
  templateUrl: './beer-ingredient.component.html',
  styleUrls: ['./beer-ingredient.component.scss']
})
export class BeerIngredientComponent implements OnInit {

  @Input() ingredient!: BeerIngredient;

  readonly isDone$ = this.beerDetailsService.ingredientsDone$.pipe(map(ingredients => ingredients.includes(this.ingredient.id)));

  constructor(private beerDetailsService: BeerDetailsService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Weight the ingredient
   */
  weight(): void {
    this.beerDetailsService.weightIngredient(this.ingredient);
    this.router.navigate(['/', appRoutes.scaleModule]);
  }

}
