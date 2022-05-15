export interface ScaleSettings {
  /** Name of the product being weighted */
  productName: string;
  /** Target weight for the product being weighted */
  targetWeight: number;
  /** Minimum weight the scale is able to weight in grams */
  minWeight: number;
  /** Maximum weight the scale is able to weight in grams */
  maxWeight: number;
  /** Amount of weight updates per second */
  updatesPerSecond: number;
}