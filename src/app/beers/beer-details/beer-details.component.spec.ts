import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BeersService } from '../beers.service';
import { beersParams } from '../constants';
import { BeerMocker, BeersServiceStub } from '../testing';
import { BeerDetailsComponent } from './beer-details.component';

describe('BeerDetailsComponent', () => {
  let component: BeerDetailsComponent;
  let fixture: ComponentFixture<BeerDetailsComponent>;
  let beersService: BeersService;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#beer-title')).nativeElement;
    },
    get image(): HTMLImageElement {
      return fixture.debugElement.query(By.css('#beer-image')).nativeElement;
    },
    get abv(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-abv'));
    },
    get ibu(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-ibu'));
    },
    get ebc(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-ebc'));
    },
    get srm(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-srm'));
    },
    get description(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#beer-description')).nativeElement;
    },
    get hops(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-hops-list'));
    },
    get malts(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-malts-list'));
    },
    get mashing(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-mashing'));
    },
    get fermentation(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-fermentation'));
    },
    get twist(): DebugElement {
      return fixture.debugElement.query(By.css('#beer-twist'));
    },
  }
  const beerId = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ BeerDetailsComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: BeersService, useClass: BeersServiceStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([[beersParams.beerId, beerId]]) } }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    beersService = TestBed.inject(BeersService);

    fixture = TestBed.createComponent(BeerDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should show all of the beer details', () => {
    const beer = BeerMocker.generateOne({ id: beerId, ibu: null, ebc: null, srm: null, twist: null });
    spyOn(beersService, 'getOne').and.returnValue(of(beer));

    fixture.detectChanges();

    expect(beersService.getOne).toHaveBeenCalledWith(beer.id);
    expect(page.title.innerText).toBe(beer.name);
    expect(page.image.src).toContain(beer.imageUrl);
    expect(page.description.innerText).toBe(beer.description);
    expect(page.abv).toBeTruthy();
    expect(page.ibu).toBeFalsy();
    expect(page.ebc).toBeFalsy();
    expect(page.srm).toBeFalsy();
    expect(page.hops).toBeTruthy();
    expect(page.malts).toBeTruthy();
    expect(page.mashing).toBeTruthy();
    expect(page.fermentation).toBeTruthy();
    expect(page.twist).toBeFalsy();
  });

  it('should show all of the beer details', () => {
    const beer = BeerMocker.generateOne({ id: beerId, ibu: 10, ebc: 10, srm: 10, twist: 'twist' });
    spyOn(beersService, 'getOne').and.returnValue(of(beer));

    fixture.detectChanges();

    expect(beersService.getOne).toHaveBeenCalledWith(beer.id);
    expect(page.title.innerText).toBe(beer.name);
    expect(page.image.src).toContain(beer.imageUrl);
    expect(page.description.innerText).toBe(beer.description);
    expect(page.abv).toBeTruthy();
    expect(page.ibu).toBeTruthy();
    expect(page.ebc).toBeTruthy();
    expect(page.srm).toBeTruthy();
    expect(page.hops).toBeTruthy();
    expect(page.malts).toBeTruthy();
    expect(page.mashing).toBeTruthy();
    expect(page.fermentation).toBeTruthy();
    expect(page.twist).toBeTruthy();
  });
});
