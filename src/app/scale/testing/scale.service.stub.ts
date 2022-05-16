import { EMPTY, Observable, ReplaySubject, Subject } from "rxjs";
import { ScaleFinishWeightReasons } from "../constants";
import { ScaleSettings, ScaleFinishWeightEvent } from "../models";

export class ScaleServiceStub {
  weight$ = new Subject<number>();
  settings$ = new ReplaySubject<ScaleSettings>();
  finishWeight$ = new Subject<ScaleFinishWeightEvent>();
  weight(productName: string, targetWeight: number): Observable<ScaleFinishWeightEvent> {
    return EMPTY;
  }
  finishWeight(reason: ScaleFinishWeightReasons): void { }
}
