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
    { timestamp: 300, weight: 300 },
    { timestamp: 200, weight: 200 },
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
        bufferTime(1000), // Give enough time to the scale to sent all its values
        take(1)
      )
      .subscribe(weights => {
        expect(weights).toEqual([
          /**
           * First event at 50ms | Weight 100
           * Weight gap: 100 / 10 = 10
          */
          10, 20, 30, 40,
          /**
           * Second event at 100ms | Weight: 300
           * Weight gap: (300 - 40) / 10 = 26
          */
          66, 92, 118, 144, 
          /**
           * Third event at 150ms | Weight: 200
           * This event is discarded because it's weight is less than the previous one
           * Weight gap: 26
          */
          170, 196, 222, 248, 274, 300
        ]);
        done();
      });

    scaleService.startWeighting(productName, targetWeight);
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
