import { BeerFermentation } from "./beer-fermentation.model";
import { BeerHop } from "./beer-hop.model";
import { BeerMalt } from "./beer-malt.model";
import { BeerMashing } from "./beer-mashing.model";

export interface Beer {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  abv: number;
  ibu: number | null;
  ebc: number | null;
  srm: number | null;
  method: {
    mashing: BeerMashing[];
    fermentation: BeerFermentation;
    twist: string | null;
  };
  ingredients: {
    malt: BeerMalt[];
    hops: BeerHop[];
    yeast?: string | null;
  }
}
