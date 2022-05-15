import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { beersRoutes } from '../beers-routes';
import { BeersService } from '../beers.service';
import { beersParams } from '../constants';
import { BeerMocker, BeersServiceStub } from '../testing';
import { BeersListComponent } from './beers-list.component';

describe('BeersListComponent', () => {
  let component: BeersListComponent;
  let fixture: ComponentFixture<BeersListComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let beersService: BeersService;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#list-title')).nativeElement;
    },
    get beers(): DebugElement[] {
      return fixture.debugElement.queryAll(By.css('fresco-beers-list-item'));
    },
  }
  const beers = BeerMocker.generateList(BeerMocker.generateInt(100));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ BeersListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: BeersService, useClass: BeersServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    beersService = TestBed.inject(BeersService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    spyOn(beersService, 'getList').and.returnValue(of(beers));

    fixture = TestBed.createComponent(BeersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    expect(page.title.innerText).toBe('Beers');
  });

  it('should render a list of beers', () => {
    expect(page.beers.length).toBe(beers.length);
  });

  it('should navigate to the details page when a beer is clicked', () => {
    spyOn(router, 'navigate');
    const index = 5;
    const beerId = beers[index].id;
    page.beers[index].triggerEventHandler('click', beerId);
    const expectedPath = beersRoutes.details.replace(`:${beersParams.beerId}`, beerId.toString());
    expect(router.navigate).toHaveBeenCalledWith([expectedPath], { relativeTo: route });
  });
});
