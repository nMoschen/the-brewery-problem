import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerMetricUnits } from "../constants";
import { BeerMetric } from "../models";

export class BeerMetricMocker extends BaseMocker {

  static generateOne(options: { value?: number, unit: BeerMetricUnits }): BeerMetric {
    const value = options?.value || BeerMetricMocker.generateFloat(1000);
    return { value, unit: options.unit }
  }
}
