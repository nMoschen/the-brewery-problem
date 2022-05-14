import { BeerHopDTO } from "./beer-hop.dto";
import { BeerMaltDTO } from "./beer-malt.dto";
import { BeerMetric } from "./beer-metric.model";

export interface BeerDTO {
  id: number;
  name: string;
  description: string;
  image_url: string;
  abv: number | undefined;
  ibu: number | undefined;
  ebc: number | undefined;
  srm: number | undefined;
  method: {
    mash_temp: { temp: BeerMetric; duration: number }[];
    fermentation: { temp: BeerMetric };
    twist: string;
  };
  ingredients: {
    malt: BeerMaltDTO[];
    hops: BeerHopDTO[];
  };
}
