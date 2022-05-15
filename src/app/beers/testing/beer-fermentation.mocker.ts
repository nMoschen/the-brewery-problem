import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerMetricUnit } from "../constants";
import { BeerFermentation } from "../models";
import { BeerMetricMocker } from "./beer-metric.mocker";

export class BeerFermentationMocker extends BaseMocker {

  static generateOne(): BeerFermentation {
    return {
      temp: BeerMetricMocker.generateOne({ unit: BeerMetricUnit.Celsius }),
    }
  }
}
