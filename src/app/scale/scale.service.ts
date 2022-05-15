import { Injectable } from '@angular/core';
import { concatMap, delay, filter, from, Observable, of, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { scaleEvents } from '../mock';
import { scaleDefaultSettings, ScaleFinishWeightReasons } from './constants';
import { ScaleFinishWeightEvent, ScaleSettings, ScaleWeightEvent } from './models';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  private readonly weightSource = new Subject<number>();
  readonly weight$ = this.weightSource.asObservable();

  private readonly settingsSource = new ReplaySubject<ScaleSettings>();
  readonly settings$ = this.settingsSource.asObservable();

  private readonly finishWeightSource = new Subject<ScaleFinishWeightEvent>();
  readonly finishWeight$ = this.finishWeightSource.asObservable();

  private lastScaleEvent!: ScaleWeightEvent;
  private lastNotifiedWeight = 0;
  private settings!: ScaleSettings;
  private refreshGap!: number;

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
    this.setSettings(productName, targetWeight);
    this.listenToWeights();
    return this.finishWeight$;
  }

  /**
   * Finish current weight
   *
   * @param reason Reason to end current weight
   */
  finishWeight(reason: ScaleFinishWeightReasons): void {
    this.finishWeightSource.next({ reason });
  }

  private listenToWeights(): void {
    this.reset();
    scaleEvents
      .pipe(
        filter(({ timestamp, weight }) => timestamp > this.lastScaleEvent.timestamp && weight > this.lastScaleEvent.weight),
        switchMap((event: ScaleWeightEvent) => {
          console.log('EVENT:', event.weight)
  
          const currentWeight = event.weight;
          const lastWeight = this.lastNotifiedWeight || this.lastScaleEvent.weight;
  
          this.lastScaleEvent = event;

          const weights = this.generateNextWeights(currentWeight, lastWeight);

          return from(weights)
            .pipe(
              concatMap(weight => of(weight).pipe(delay(this.refreshGap)))
            );
        }),
        takeUntil(this.finishWeight$)
      )
      .subscribe(weight => {
        console.log('SHOWN:', weight, '  |  DIFF:', weight - this.lastNotifiedWeight);
        this.lastNotifiedWeight = weight;
        this.weightSource.next(weight);
      });
  }

  private setSettings(productName: string, targetWeight: number): void {
    this.settings = { ...scaleDefaultSettings, productName, targetWeight };
    const oneSecond = 1000;
    this.refreshGap = oneSecond / this.settings.updatesPerSecond;
    this.settingsSource.next(this.settings);
  }

  private reset(): void {
    this.lastScaleEvent = { timestamp: 0, weight: scaleDefaultSettings.minWeight };
  }

  private generateNextWeights(currentWeight: number, lastWeight: number): number[] {
    const weights: number[] = [];
    const weightGap = (currentWeight - lastWeight) / this.refreshGap;

    let weight = lastWeight + weightGap;
    while (weight < currentWeight) {
      weights.push(weight);
      weight += weightGap;
    }
    weights.push(currentWeight);

    return weights;
  }
}
