import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerIngredientComponent } from './beer-ingredient.component';

describe('BeerIngredientComponent', () => {
  let component: BeerIngredientComponent;
  let fixture: ComponentFixture<BeerIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
