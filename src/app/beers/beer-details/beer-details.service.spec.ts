import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ScaleFinishWeightReason } from 'src/app/scale/constants';
import { ScaleService } from 'src/app/scale/scale.service';
import { ScaleServiceStub } from 'src/app/scale/testing';
import { BeerHopMocker } from '../testing';

import { BeerDetailsService } from './beer-details.service';

describe('BeerDetailsService', () => {
  let beerDetailsService: BeerDetailsService;
  let scaleService: ScaleServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ScaleService, useClass: ScaleServiceStub }
      ]
    });
    beerDetailsService = TestBed.inject(BeerDetailsService);
    scaleService = TestBed.inject(ScaleService) as unknown as ScaleServiceStub;
  });

  it('should be created', () => {
    expect(beerDetailsService).toBeTruthy();
  });

  it('should weight an ingredient and notify as done when it was weighted ', (done: DoneFn) => {
    const hop = BeerHopMocker.generateOne();
    spyOn(scaleService, 'weight').and.returnValue(of({ reason: ScaleFinishWeightReason.Done }));

    beerDetailsService.weightIngredient(hop);

    expect(scaleService.weight).toHaveBeenCalledWith(hop.name, hop.amount.value);
    beerDetailsService
      .ingredientsDone$
      .subscribe(ingredients => {
        expect(ingredients).toEqual([hop.id]);
        done();
      });
  });

  it('should weight an ingredient and not notify as done when weighting was cancelled ', (done: DoneFn) => {
    const hop = BeerHopMocker.generateOne();
    spyOn(scaleService, 'weight').and.returnValue(of({ reason: ScaleFinishWeightReason.Cancelled }));

    beerDetailsService.weightIngredient(hop);

    expect(scaleService.weight).toHaveBeenCalledWith(hop.name, hop.amount.value);
    beerDetailsService
      .ingredientsDone$
      .subscribe(ingredients => {
        expect(ingredients).toEqual([]);
        done();
      });
  });
});
