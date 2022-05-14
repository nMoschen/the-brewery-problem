export enum FinishWeightReason {
  Cancelled = 0,
  Done = 1,
  Error = 2
}

export type FinishWeightReasons = FinishWeightReason.Cancelled | FinishWeightReason.Done | FinishWeightReason.Error;
