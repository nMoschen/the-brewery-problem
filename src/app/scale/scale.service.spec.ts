import { TestBed } from '@angular/core/testing';
import { concatMap, delay, take, from, of, bufferTime, EMPTY } from 'rxjs';
import { ApplianceService } from '../mock';
import { scaleDefaultSettings, ScaleFinishWeightReason } from './constants';
import { ApplianceWeightEvent } from './models';
import { ScaleService } from './scale.service';

describe('ScaleService', () => {
  let scaleService: ScaleService;
  let applianceService: ApplianceService;

  const productName = 'Product 1 - Name';
  const targetWeight = 252;
  const applianceEvents: ApplianceWeightEvent[] = [
    { timestamp: 100, weight: 100 },
    { timestamp: 300, weight: 200 },
    { timestamp: 200, weight: 150 },
  ];
  const applianceEventsDelay = 50;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    scaleService = TestBed.inject(ScaleService);
    applianceService = TestBed.inject(ApplianceService);
  });

  it('should be created', () => {
    expect(scaleService).toBeTruthy();
  });

  it('should set the service up when it starts weighting', (done: DoneFn) => {
    applianceService.events$ = EMPTY;
    scaleService
      .settings$
      .pipe(take(1))
      .subscribe(settings => {
        expect(settings).toEqual({ ...scaleDefaultSettings, productName, targetWeight });
        done();
      });
    
    scaleService.startWeighting(productName, targetWeight);
  });

  it('should determine that the service is set up', () => {
    applianceService.events$ = EMPTY;
    scaleService.startWeighting(productName, targetWeight); // Sets the service up
    expect(scaleService.isSetUp()).toBe(true);
  });

  it('should determine that the service is not set up', () => {
    expect(scaleService.isSetUp()).toBe(false);
  });

  it('should weight', (done: DoneFn) => {
    applianceService.events$ = from(applianceEvents).pipe(concatMap(event => of(event).pipe(delay(applianceEventsDelay))));
    scaleService
      .weight$
      .pipe(
        bufferTime(600), // Give enough time the scale sent all its values
        take(1)
      )
      .subscribe(weights => {
        expect(weights).toEqual([
          /**
           * Considering a view refresh gap of 1000ms / 50ms = 20ms
           */
          /**
           * Time: 50ms
           * First appliance event: weight 100g
           * Weight gap: 100ms / 20ms = 5ms
          */
          5,  // Time: 70ms
          10, // Time: 90ms
          /**
           * Time: 100ms
           * Second appliance event: weight 200g
           * Weight gap: (200ms - 10ms) / 20ms = 9.5ms
          */
          19.5, // Time: 120ms
          29,   // Time: 140ms
          /**
           * Time: 150ms
           * Third appliance event: weight 150g
           * This event is discarded because it's weight is less than the previous one
           * Weight gap: 9.5ms
          */
          38.5, 48, 57.5, 67, 76.5, 86, 95.5, 105, 114.5, 124, 133.5, 143, 152.5, 162, 171.5, 181, 190.5,
          /**
           * Time: 510ms
           * Last weight event
           */
          200
        ]);
        done();
      });

    scaleService.startWeighting(productName, targetWeight, { updatesPerSecond: 50 });
  });

  it('should finish weighting', (done: DoneFn) => {
    applianceService.events$ = EMPTY;
    scaleService
      .startWeighting(productName, targetWeight)
      .subscribe(({ reason }) => {
        expect(reason).toBe(ScaleFinishWeightReason.Done);
        done();
      });
    scaleService.finishWeighting(ScaleFinishWeightReason.Done);
  });
});
