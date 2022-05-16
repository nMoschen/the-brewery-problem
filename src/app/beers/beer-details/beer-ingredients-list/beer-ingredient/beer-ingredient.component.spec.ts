import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from 'src/app/app-routes';
import { BeerMaltMocker } from 'src/app/beers/testing';
import { BeerDetailsService } from '../../beer-details.service';
import { BeerDetailsServiceStub } from '../../testing';
import { BeerIngredientComponent } from './beer-ingredient.component';

describe('BeerIngredientComponent', () => {
  let component: BeerIngredientComponent;
  let fixture: ComponentFixture<BeerIngredientComponent>;
  let beerDetailsService: BeerDetailsServiceStub;
  let router: Router;

  const page = {
    get doneImg(): DebugElement {
      return fixture.debugElement.query(By.css('#ingredient-done-image'));
    },
    get notDoneImg(): DebugElement {
      return fixture.debugElement.query(By.css('#ingredient-not-done-image'));
    },
    get ingredientName(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#ingredient-info-name')).nativeElement;
    },
    get ingredientAmount(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#ingredient-info-amount')).nativeElement;
    },
    get weightButton(): DebugElement {
      return fixture.debugElement.query(By.css('#ingredient-weight-button'));
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ BeerIngredientComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: BeerDetailsService, useClass: BeerDetailsServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    beerDetailsService = TestBed.inject(BeerDetailsService) as unknown as BeerDetailsServiceStub;

    fixture = TestBed.createComponent(BeerIngredientComponent);
    component = fixture.componentInstance;
  });

  it('should show the ingredients details', () => {
    const ingredient = BeerMaltMocker.generateOne();
    component.ingredient = ingredient;

    fixture.detectChanges();

    expect(page.ingredientName.innerText).toBe(ingredient.name);
    expect(page.ingredientAmount.innerText).toBe(`${ingredient.amount.value} ${ingredient.amount.unit}`);
  });

  it('should show that an ingredient is done', () => {
    const ingredient = BeerMaltMocker.generateOne();
    component.ingredient = ingredient;
    beerDetailsService.ingredientsDone$.next([ingredient.id]);

    fixture.detectChanges();

    expect(page.doneImg.nativeElement.src).toContain('assets/icons/done.svg');
    expect(page.notDoneImg).toBeFalsy();
  });

  it('should show that an ingredient is not done', () => {
    const ingredient = BeerMaltMocker.generateOne();
    component.ingredient = ingredient;
    beerDetailsService.ingredientsDone$.next([]);

    fixture.detectChanges();

    expect(page.notDoneImg.nativeElement.src).toContain('assets/icons/not-done.svg');
    expect(page.doneImg).toBeFalsy();
  });

  it('should navigate to the weight page when a ingredient is clicked', () => {
    spyOn(router, 'navigate');
    const ingredient = BeerMaltMocker.generateOne();
    component.ingredient = ingredient;
    fixture.detectChanges();

    page.weightButton.triggerEventHandler('click', { });
    expect(router.navigate).toHaveBeenCalledWith(['/', appRoutes.scaleModule]);
  });
});
