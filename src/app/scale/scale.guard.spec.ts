import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ScaleGuard } from './scale.guard';
import { ScaleService } from './scale.service';
import { ScaleServiceStub } from './testing';

describe('ScaleGuard', () => {
  let guard: ScaleGuard;
  let scaleService: ScaleService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ScaleService, useClass: ScaleServiceStub }
      ]
    });
    guard = TestBed.inject(ScaleGuard);
    scaleService = TestBed.inject(ScaleService);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should go back if the scale was not set up', () => {
    spyOn(scaleService, 'isSetUp').and.returnValue(false);
    spyOn(location, 'back');
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(location.back).toHaveBeenCalled();
  });

  it('should allow navigation when the scale was properly set up', () => {
    spyOn(scaleService, 'isSetUp').and.returnValue(true);
    spyOn(location, 'back');
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
    expect(location.back).not.toHaveBeenCalled();
  });
});
