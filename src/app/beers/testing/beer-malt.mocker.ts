import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerMetricUnit } from "../constants";
import { BeerMalt } from "../models";
import { BeerMetricMocker } from "./beer-metric.mocker";

export class BeerMaltMocker extends BaseMocker {

  static generateList(amount: number): BeerMalt[] {
    return Array.from(Array(amount), (id) => this.generateOne({ id }));
  }

  static generateOne(options?: { id?: string }): BeerMalt {
    const id = options?.id !== undefined ? options.id : `${BeerMaltMocker.generateInt()}`;
    return {
      id,
      name: `Malt ${id}`,
      amount: BeerMetricMocker.generateOne({ unit: BeerMetricUnit.Grams })
    }
  }
}
