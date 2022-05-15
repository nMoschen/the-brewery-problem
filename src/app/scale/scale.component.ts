import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ScaleFinishWeightReason } from './constants';
import { ScaleService } from './scale.service';

@Component({
  selector: 'fresco-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit, OnDestroy {

  private isDone = false;

  constructor(private scaleService: ScaleService, private location: Location) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!this.isDone) {
      this.scaleService.finishWeight(ScaleFinishWeightReason.Cancelled);
    }
  }

  /**
   * Mark weighting as done
   */
  done(): void {
    this.scaleService.finishWeight(ScaleFinishWeightReason.Done);
    this.isDone = true;
    this.location.back();
  }

}
