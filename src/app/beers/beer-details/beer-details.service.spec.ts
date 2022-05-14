import { TestBed } from '@angular/core/testing';

import { BeerDetailsService } from './beer-details.service';

describe('BeerDetailsService', () => {
  let service: BeerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
