import { BeerMetric } from "./beer-metric.model";

export interface BeerIngredient {
  id: string;
  name: string;
  amount: BeerMetric;
}