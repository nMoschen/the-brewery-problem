import { BeerMetric } from "./beer-metric.model";

export interface BeerDTO {
  id: number;
  name: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  ebc: number;
  srm: number;
  method: {
    mash_temp: { temp: BeerMetric; duration: number }[];
    fermentation: { temp: BeerMetric };
    twist: string;
  };
  ingredients: {
    malt: { name: string; amount: BeerMetric }[];
    hops: { name: string; amount: BeerMetric; add: string }[];
  };
}
