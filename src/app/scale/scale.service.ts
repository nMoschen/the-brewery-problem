import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ScaleFinishWeightReasons } from './constants';
import { ScaleFinishWeightEvent } from './models';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  // weights$: observable<WeightEvent>;
  private readonly settings$ = new Subject();
  private readonly finishWeight$ = new Subject<ScaleFinishWeightEvent>();

  /**
   * Weight something
   *
   * @param productName Name of the product that is being weighted 
   *
   * @param targetWeight Target weight to be set in the scale
   *
   * @returns An observable that marks when weight has finished
   */
  weight(productName: string, targetWeight: number): Observable<ScaleFinishWeightEvent> {
    this.settings$.next({ productName, targetWeight });
    // this.weights$ = observable
    //   .pipe(
    //     takeuntil(this.finishWeight$)
    //   )
    return this.finishWeight$;
  }

  /**
   * Finish current weight
   *
   * @param reason Reason to end current weight
   */
  finishWeight(reason: ScaleFinishWeightReasons): void {
    this.finishWeight$.next({ reason });
  }

}
