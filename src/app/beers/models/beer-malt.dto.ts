import { BeerMetric } from "./beer-metric.model";

export interface BeerMaltDTO {
  name: string;
  amount: BeerMetric;
}