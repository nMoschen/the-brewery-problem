import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerFermentationComponent } from './beer-fermentation.component';

describe('BeerFermentationComponent', () => {
  let component: BeerFermentationComponent;
  let fixture: ComponentFixture<BeerFermentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerFermentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFermentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
