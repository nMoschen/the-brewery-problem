import { BeerIngredient } from "./beer-ingredient.model";

export interface BeerHop extends BeerIngredient {
  add: string;
  attribute: string;
}