import { BaseMocker } from "src/app/shared/testing/base.mocker";
import { BeerMetricUnit } from "../constants";
import { BeerMashing } from "../models";
import { BeerMetricMocker } from "./beer-metric.mocker";

export class BeerMashingMocker extends BaseMocker {

  static generateList(amount: number): BeerMashing[] {
    return Array.from(Array(amount), () => BeerMashingMocker.generateOne());
  }

  static generateOne(options?: { duration?: number | null }): BeerMashing {
    const duration = options?.duration !== undefined ? options.duration : BeerMashingMocker.generateInt(100);
    return {
      temp: BeerMetricMocker.generateOne({ unit: BeerMetricUnit.Celsius }),
      duration
    }
  }
}
