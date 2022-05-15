export enum BeerMetricUnit {
  Celsius = 'celsius',
  Grams = 'grams',
  Kilograms = 'kilograms'
}

export type BeerMetricUnits = BeerMetricUnit.Celsius | BeerMetricUnit.Grams | BeerMetricUnit.Kilograms;
