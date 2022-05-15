import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BeerMocker } from '../../testing';
import { BeersListItemComponent } from './beers-list-item.component';

describe('BeersListItemComponent', () => {
  let component: BeersListItemComponent;
  let fixture: ComponentFixture<BeersListItemComponent>;

  const page = {
    get imageElement(): HTMLImageElement {
      return fixture.debugElement.query(By.css('#item-image')).nativeElement;
    },
    get nameElement(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#item-name')).nativeElement;
    },
    get descriptorAbv(): DebugElement {
      return fixture.debugElement.query(By.css('#item-descriptor-abv'));
    },
    get descriptorIbu(): DebugElement {
      return fixture.debugElement.query(By.css('#item-descriptor-ibu'));
    },
    get descriptorEbc(): DebugElement {
      return fixture.debugElement.query(By.css('#item-descriptor-ebc'));
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ BeersListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersListItemComponent);
    component = fixture.componentInstance;
  });

  it('should show essential beer details', () => {
    const beer = BeerMocker.generateOne({ ibu: null, ebc: null });
    component.beer = beer;
    fixture.detectChanges();

    expect(page.imageElement.src).toContain(beer.imageUrl);
    expect(page.nameElement.innerText).toBe(beer.name);
    expect(page.descriptorAbv).toBeTruthy();
    expect(page.descriptorIbu).toBeFalsy();
    expect(page.descriptorEbc).toBeFalsy();
  });

  it('should show descriptor IBU when beer has IBU', () => {
    const beer = BeerMocker.generateOne();
    component.beer = beer;
    fixture.detectChanges();

    expect(page.imageElement.src).toContain(beer.imageUrl);
    expect(page.nameElement.innerText).toBe(beer.name);
    expect(page.descriptorAbv).toBeTruthy();
    expect(page.descriptorIbu).toBeTruthy();
    expect(page.descriptorEbc).toBeTruthy();
  });
});
