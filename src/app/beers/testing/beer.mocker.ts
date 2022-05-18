import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerFermentationMocker } from "./beer-fermentation.mocker";
import { BeerHopMocker } from "./beer-hop.mocker";
import { BeerMaltMocker } from "./beer-malt.mocker";
import { BeerMashingMocker } from "./beer-mashing.mocker";
import { Beer } from "../models";

export interface BeerMockerOptions {
  id?: number;
  ibu?: number | null;
  ebc?: number | null;
  srm?: number | null;
  twist?: string | null;
  yeast?: string | null;
}

export class BeerMocker extends BaseMocker {

  static generateList(amount: number, options?: BeerMockerOptions): Beer[] {
    return Array.from(Array(amount), (id) => this.generateOne({ ...options, id }));
  }

  static generateOne(options?: BeerMockerOptions): Beer {
    const id = options?.id !== undefined ? options.id : BeerMocker.generateInt();
    const name = `Beer ${id}`;
    const ibu = options?.ibu !== undefined ? options.ibu : BeerMocker.generateInt(300);
    const ebc = options?.ebc !== undefined ? options.ebc : BeerMocker.generateInt(300);
    const srm = options?.srm !== undefined ? options.srm : BeerMocker.generateInt(100);
    const twist = options?.twist !== undefined ? options.twist : null;
    const yeast = options?.yeast !== undefined ? options.yeast : null;

    return {
      id,
      name,
      description: `Description for ${name}`,
      imageUrl: BeerMocker.generateUrl(),
      abv: BeerMocker.generateInt(100),
      ibu,
      ebc,
      srm,
      method: {
        mashing: BeerMashingMocker.generateList(BeerMocker.generateInt(3)),
        fermentation: BeerFermentationMocker.generateOne(),
        twist,
      },
      ingredients: {
        malt: BeerMaltMocker.generateList(BeerMocker.generateInt(5)),
        hops: BeerHopMocker.generateList(BeerMocker.generateInt(5)),
        yeast
      }
    }
  }
}