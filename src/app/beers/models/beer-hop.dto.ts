import { BeerMetric } from "./beer-metric.model";

export interface BeerHopDTO {
  name: string;
  amount: BeerMetric;
  add: string;
  attribute: string;
}