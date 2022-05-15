import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ScaleFinishWeightReason } from './constants';
import { ScaleService } from './scale.service';
import { ScaleSettings } from './models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fresco-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit, OnDestroy {

  private readonly onDestroy$ = new Subject<void>();
  private isDone = false;

  readonly weight$ = this.scaleService.weight$;

  settings!: ScaleSettings;

  constructor(private scaleService: ScaleService, private location: Location) { }

  ngOnInit(): void {
    this.initSettings();
  }

  ngOnDestroy(): void {
    if (!this.isDone) {
      this.scaleService.finishWeight(ScaleFinishWeightReason.Cancelled);
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Mark weighting as done
   */
  done(): void {
    this.scaleService.finishWeight(ScaleFinishWeightReason.Done);
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

}
