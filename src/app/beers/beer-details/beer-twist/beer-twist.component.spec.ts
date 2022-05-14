import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerTwistComponent } from './beer-twist.component';

describe('BeerTwistComponent', () => {
  let component: BeerTwistComponent;
  let fixture: ComponentFixture<BeerTwistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerTwistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerTwistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
