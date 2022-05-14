import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerMashingComponent } from './beer-mashing.component';

describe('BeerMashingComponent', () => {
  let component: BeerMashingComponent;
  let fixture: ComponentFixture<BeerMashingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerMashingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerMashingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
