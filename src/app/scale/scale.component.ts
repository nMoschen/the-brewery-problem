import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ScaleFinishWeightReason } from './constants';
import { ScaleService } from './scale.service';
import { ScaleSettings } from './models';
import { bufferTime, filter, Subject, takeUntil } from 'rxjs';
import { scaleAnimation, scaleAnimationDuration } from './scale.animation';

@Component({
  selector: 'fresco-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
  animations: [scaleAnimation]
})
export class ScaleComponent implements OnInit, OnDestroy {

  private readonly onDestroy$ = new Subject<void>();
  private isDone = false;

  readonly weight$ = this.scaleService.weight$;
  readonly weightFormat = '1.0-0';

  rotation!: number;
  settings!: ScaleSettings;

  constructor(private scaleService: ScaleService, private location: Location) { }

  ngOnInit(): void {
    this.initSettings();
    this.initAnimation();
  }

  ngOnDestroy(): void {
    if (!this.isDone) {
      this.scaleService.finishWeighting(ScaleFinishWeightReason.Cancelled);
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Mark weighting as done
   */
  markAsDone(): void {
    this.scaleService.finishWeighting(ScaleFinishWeightReason.Done);
    this.isDone = true;
    this.location.back();
  }

  /**
   * Initialize component's settings
   */
  private initSettings(): void {
    this.scaleService
      .settings$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(settings => this.settings = settings);
  }

  /**
   * Initialize animation
   */
  private initAnimation(): void {
    this.rotation = 0;
    this.weight$
      .pipe(
        bufferTime(scaleAnimationDuration), // Give the animation time to complete
        filter(weights => !!weights.length),
        takeUntil(this.onDestroy$)
      )
      .subscribe(weights => {
        const weight = weights.pop() as number;
        const completeRotationClockwise = -360;
        this.rotation = weight * completeRotationClockwise / this.settings.maxWeight;
      });
  }
}
