import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScaleFinishWeightReason } from 'src/app/scale/constants';
import { ScaleService } from 'src/app/scale/scale.service';
import { BeerMetricUnit } from '../constants';
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
    const targetWeight = ingredient.amount.value * this.getConversionRateToGrams(ingredient);
    this.scaleService
      .startWeighting(ingredient.name, targetWeight)
      .subscribe(({ reason }) => {
        if (reason === ScaleFinishWeightReason.Done) {
          this.ingredientsDone = [ ...this.ingredientsDone, ingredient.id];
          this.ingredientsDoneSource.next(this.ingredientsDone);
        }
      });
  }

  /**
   * Get the conversion rate to convert the ingredient's weight to grams
   *
   * @param ingredient Ingredient to be weighted
   *
   * @returns The conversion rate to convert weight to grams
   */
  private getConversionRateToGrams(ingredient: BeerIngredient): number {
    if (ingredient.amount.unit === BeerMetricUnit.Grams) {
      return 1;
    }
    if (ingredient.amount.unit === BeerMetricUnit.Kilograms) {
      return 1000;
    }
    throw new Error('Weight should be in either grams or kilograms');
  }
}
