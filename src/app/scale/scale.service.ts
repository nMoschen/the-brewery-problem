import { Injectable } from '@angular/core';
import { concatMap, delay, filter, from, Observable, of, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { applianceEvents } from '../mock';
import { scaleDefaultSettings, ScaleFinishWeightReasons } from './constants';
import { ScaleFinishWeightEvent, ScaleSettings, ApplianceWeightEvent } from './models';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  /** Stream of weights to be shown in the view */
  private readonly weightSource = new Subject<number>();
  readonly weight$ = this.weightSource.asObservable();
  /** Stream of scale settings */
  private readonly settingsSource = new ReplaySubject<ScaleSettings>();
  readonly settings$ = this.settingsSource.asObservable();
  /** Stream of events that notify that user has finished weighting */
  private readonly finishWeightSource = new Subject<ScaleFinishWeightEvent>();
  readonly finishWeight$ = this.finishWeightSource.asObservable();
  /** Last event from the appliance */
  private lastApplianceEvent!: ApplianceWeightEvent;
  /** Last weight that was notified to view */
  private lastNotifiedWeight = scaleDefaultSettings.minWeight;
  /** Scale settings */
  private settings!: ScaleSettings;
  /** Refresh gap for to update the view with the last weight */
  private viewRefreshGap!: number;

  /**
   * Start weighting something
   *
   * @param productName Name of the product that is being weighted 
   *
   * @param targetWeight Target weight to be set in the scale
   *
   * @returns An observable that marks when weight has finished
   */
  startWeighting(productName: string, targetWeight: number): Observable<ScaleFinishWeightEvent> {
    this.reset();
    this.setSettings(productName, targetWeight);
    this.listenToWeightingAppliance();
    return this.finishWeight$;
  }

  /**
   * Finish current weighting
   *
   * @param reason Reason to end current weight
   */
  finishWeighting(reason: ScaleFinishWeightReasons): void {
    this.finishWeightSource.next({ reason });
  }

  /**
   * Determines whether the scale was set up
   */
  isSetUp(): boolean {
    return !!this.settings;
  }

  /**
   * Listen weighting appliance
   */
  private listenToWeightingAppliance(): void {
    applianceEvents // Mock of events from appliance. To be replaced with an actual observable from the appliance
      .pipe(
        filter(({ timestamp, weight }) => timestamp > this.lastApplianceEvent.timestamp && weight > this.lastApplianceEvent.weight),
        switchMap((event: ApplianceWeightEvent) => {
          const currentWeight = event.weight;
          const lastWeight = this.lastNotifiedWeight || this.lastApplianceEvent.weight;
          this.lastApplianceEvent = event;
          return from(this.generateNextWeights(currentWeight, lastWeight)).pipe(concatMap(weight => of(weight).pipe(delay(this.viewRefreshGap))));
        }),
        takeUntil(this.finishWeight$)
      )
      .subscribe(weight => {
        this.lastNotifiedWeight = weight;
        this.weightSource.next(weight);
      });
  }

  /**
   * Set scale settings
   *
   * @param productName Name of the product to be weighted
   *
   * @param targetWeight Target weight of the product to be weighted
   */
  private setSettings(productName: string, targetWeight: number): void {
    this.settings = { ...scaleDefaultSettings, productName, targetWeight };
    const oneSecond = 1000;
    this.viewRefreshGap = oneSecond / this.settings.updatesPerSecond;
    this.settingsSource.next(this.settings);
  }

  /**
   * Reset scale
   */
  private reset(): void {
    this.lastApplianceEvent = { timestamp: 0, weight: scaleDefaultSettings.minWeight };
    this.lastNotifiedWeight = scaleDefaultSettings.minWeight;
  }

  /**
   * Generate an array of the next weights to be shown
   *
   * @param currentWeight Current weight notified by the appliance
   *
   * @param lastWeight Last weight that was shown
   *
   * @returns An array of weights to be shown in the view
   */
  private generateNextWeights(currentWeight: number, lastWeight: number): number[] {
    const weights: number[] = [];
    const weightGap = (currentWeight - lastWeight) / this.viewRefreshGap;

    let weight = lastWeight + weightGap;
    while (weight < currentWeight) {
      weights.push(weight);
      weight += weightGap;
    }
    weights.push(currentWeight);

    return weights;
  }
}
