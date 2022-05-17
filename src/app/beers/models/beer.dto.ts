import { BeerHopDTO } from "./beer-hop.dto";
import { BeerMaltDTO } from "./beer-malt.dto";
import { BeerMetric } from "./beer-metric.model";

export interface BeerDTO {
  id: number;
  name: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number | null;
  ebc: number | null;
  srm: number | null;
  method: {
    mash_temp: { temp: BeerMetric; duration: number | null }[];
    fermentation: { temp: BeerMetric };
    twist: string | null;
  };
  ingredients: {
    malt: BeerMaltDTO[];
    hops: BeerHopDTO[];
    yeast?: string;
  };
}
