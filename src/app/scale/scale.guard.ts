import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { ScaleService } from './scale.service';

@Injectable({
  providedIn: 'root'
})
export class ScaleGuard implements CanActivate {

  constructor(private scaleService: ScaleService, private location: Location) { }

  canActivate(): boolean {
    const canActivate = this.scaleService.isSetUp();
    if (!canActivate) {
      this.location.back();
    }
    return canActivate;
  }
}
