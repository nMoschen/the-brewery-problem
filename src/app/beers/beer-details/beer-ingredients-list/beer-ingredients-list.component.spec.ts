import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BeerMaltMocker } from '../../testing';
import { BeerIngredientsListComponent } from './beer-ingredients-list.component';

describe('BeerIngredientsListComponent', () => {
  let component: BeerIngredientsListComponent;
  let fixture: ComponentFixture<BeerIngredientsListComponent>;

  const page = {
    get ingredientType(): HTMLDivElement {
      return fixture.debugElement.query(By.css('#ingredient-type-name')).nativeElement;
    },
    get ingredients(): DebugElement[] {
      return fixture.debugElement.queryAll(By.css('fresco-beer-ingredient'));
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerIngredientsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerIngredientsListComponent);
    component = fixture.componentInstance;
  });

  it('should show the title', () => {
    component.ingredientTypeName = 'Malt';
    fixture.detectChanges();

    expect(page.ingredientType.innerText).toBe('Malt');
  });

  it('should render a list of ingredients', () => {
    const ingredients = BeerMaltMocker.generateList(4);
    component.ingredients = ingredients;

    fixture.detectChanges();

    expect(page.ingredients.length).toBe(4);
  });
});
