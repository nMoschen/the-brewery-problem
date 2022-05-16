import { BehaviorSubject } from "rxjs";
import { BeerIngredient } from "../../models";

export class BeerDetailsServiceStub {
  ingredientsDone$ = new BehaviorSubject<string[]>([]);

  weightIngredient(ingredient: BeerIngredient): void { }
}
