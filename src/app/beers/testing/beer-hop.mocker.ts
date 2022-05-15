import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerMetricUnit } from "../constants";
import { BeerHop } from "../models";
import { BeerMetricMocker } from "./beer-metric.mocker";

export class BeerHopMocker extends BaseMocker {

  static generateList(amount: number): BeerHop[] {
    return Array.from(Array(amount), (id) => this.generateOne({ id }));
  }

  static generateOne(options?: { id?: string }): BeerHop {
    const id = options?.id !== undefined ? options.id : `${BeerHopMocker.generateInt()}`;
    return {
      id,
      name: `Malt ${id}`,
      amount: BeerMetricMocker.generateOne({ unit: BeerMetricUnit.Grams }),
      add: `Add ${id}`,
      attribute: `Attribute ${id}`
    }
  }
}
