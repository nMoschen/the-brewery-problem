import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { scaleDefaultSettings, ScaleFinishWeightReason } from './constants';
import { ScaleComponent } from './scale.component';
import { ScaleService } from './scale.service';
import { ScaleServiceStub } from './testing';

describe('ScaleComponent', () => {
  let component: ScaleComponent;
  let fixture: ComponentFixture<ScaleComponent>;
  let scaleService: ScaleServiceStub;
  let location: Location;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#scale-title')).nativeElement;
    },
    get targetText(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#scale-target-text')).nativeElement;
    },
    get targetWeight(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#scale-target-weight')).nativeElement;
    },
    get currentWeight(): HTMLSpanElement {
      return fixture.debugElement.query(By.css('#scale-current-weight')).nativeElement;
    },
    get productName(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#scale-product-name')).nativeElement;
    },
    get markAsDone(): DebugElement {
      return fixture.debugElement.query(By.css('#scale-mark-as-done'));
    },
  }
  const settings = { ...scaleDefaultSettings, productName: 'Product 1 - Name', targetWeight: 2252.2 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleComponent ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        { provide: ScaleService, useClass: ScaleServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
    scaleService = TestBed.inject(ScaleService) as unknown as ScaleServiceStub;
    scaleService.settings$.next(settings);

    fixture = TestBed.createComponent(ScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its settings and animation', () => {
    expect(page.title.innerText).toBe('Scale');
    expect(page.targetText.innerText).toBe('YOU NEED');
    expect(page.targetWeight.innerText).toBe(`2,252 GRAMS`);
    expect(page.currentWeight.innerText).toBe(``);
    expect(component.rotation).toBe(0);
    expect(page.productName.innerText).toBe(`OF ${settings.productName.toUpperCase()}`);
  });

  it('should update the current weight', () => {
    scaleService.weight$.next(1112.2);
    fixture.detectChanges();
    expect(page.currentWeight.innerText).toBe(`1,112`);
  });

  it('should mark as done when clicking the mark-as-done button', () => {
    spyOn(scaleService, 'finishWeighting');
    spyOn(location, 'back');
    page.markAsDone.triggerEventHandler('click', { });
    expect(scaleService.finishWeighting).toHaveBeenCalledWith(ScaleFinishWeightReason.Done);
    expect(location.back).toHaveBeenCalled();
  });

  it(`should mark as cancelled when the component is destroyed and it wasn't marked as done`, () => {
    spyOn(scaleService, 'finishWeighting');
    component.ngOnDestroy();
    expect(scaleService.finishWeighting).toHaveBeenCalledWith(ScaleFinishWeightReason.Cancelled);
  });
  
});
