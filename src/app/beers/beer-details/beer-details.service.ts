import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScaleFinishWeightReason } from 'src/app/scale/constants';
import { ScaleService } from 'src/app/scale/scale.service';
import { BeerIngredient } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BeerDetailsService {

  private ingredientsDone: string[] = [];
  private readonly ingredientsDoneSource = new BehaviorSubject<string[]>(this.ingredientsDone);
  readonly ingredientsDone$ = this.ingredientsDoneSource.asObservable();

  constructor(private scaleService: ScaleService) { }

  /**
   * Weight an ingredient
   *
   * @param ingredient Ingredient to be weighted
   */
  weightIngredient(ingredient: BeerIngredient): void {
    this.scaleService
      .startWeighting(ingredient.name, ingredient.amount.value)
      .subscribe(({ reason }) => {
        if (reason === ScaleFinishWeightReason.Done) {
          this.ingredientsDone = [ ...this.ingredientsDone, ingredient.id];
          this.ingredientsDoneSource.next(this.ingredientsDone);
        }
      });
  }
}
