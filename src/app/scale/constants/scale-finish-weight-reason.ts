export enum ScaleFinishWeightReason {
  Cancelled = 0,
  Done = 1,
  Error = 2
}

export type ScaleFinishWeightReasons = ScaleFinishWeightReason.Cancelled | ScaleFinishWeightReason.Done | ScaleFinishWeightReason.Error;
