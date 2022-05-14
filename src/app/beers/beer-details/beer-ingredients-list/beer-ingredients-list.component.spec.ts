import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerIngredientsListComponent } from './beer-ingredients-list.component';

describe('BeerIngredientsListComponent', () => {
  let component: BeerIngredientsListComponent;
  let fixture: ComponentFixture<BeerIngredientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerIngredientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerIngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
